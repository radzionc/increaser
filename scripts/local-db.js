#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
/**
 * Sobe um DynamoDB local (dynalite) e cria as tabelas do produto,
 * para testar o app sem depender de credenciais AWS reais.
 *
 * Uso: yarn db:local
 * Endpoint: http://localhost:8000
 */
const {
  DynamoDBClient,
  CreateTableCommand,
} = require('@aws-sdk/client-dynamodb')
const dynalite = require('dynalite')

const PORT = 8000
const ENDPOINT = `http://localhost:${PORT}`

// Mesmo prefixo usado em product/db/tableName.ts para NODE_ENV !== 'test'
const prefix = process.env.NODE_ENV === 'test' ? 'test_' : 'pomodoro_'

const throughput = { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }

const tables = [
  {
    TableName: `${prefix}users`,
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: throughput,
      },
    ],
    ProvisionedThroughput: throughput,
  },
  ...['scoreboards', 'features', 'emails'].map((name) => ({
    TableName: `${prefix}${name}`,
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: throughput,
  })),
]

const createTables = async () => {
  const client = new DynamoDBClient({
    endpoint: ENDPOINT,
    region: 'local',
    credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
  })

  for (const table of tables) {
    try {
      await client.send(new CreateTableCommand(table))
      console.log(`✔ tabela criada: ${table.TableName}`)
    } catch (error) {
      if (error.name === 'ResourceInUseException') {
        console.log(`• tabela já existe: ${table.TableName}`)
      } else {
        console.error(`✘ falha ao criar ${table.TableName}:`, error.message)
      }
    }
  }

  console.log(`\nDynamoDB local pronto em ${ENDPOINT}`)
  console.log(
    'Defina DYNAMODB_LOCAL=true no seu .envrc para o app usar este banco.',
  )
}

const server = dynalite({ createTableMs: 0 })

server.listen(PORT, async (err) => {
  if (err) {
    console.error('Falha ao iniciar dynalite:', err)
    process.exit(1)
  }
  console.log(`Dynalite (DynamoDB local) escutando em ${ENDPOINT}`)
  await createTables()
})
