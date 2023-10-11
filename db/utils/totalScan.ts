import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb'

export const totalScan = <T>(
  client: DynamoDBDocumentClient,
  params: Omit<ScanCommandInput, 'ExclusiveStartKey'>,
): Promise<T[]> => {
  const recursiveScan = async (
    lastEvaluatedKey?: Record<string, any>,
  ): Promise<T[]> => {
    const command = new ScanCommand({
      ExclusiveStartKey: lastEvaluatedKey,
      ...params,
    })
    const { Items, LastEvaluatedKey } = await client.send(command)

    return [
      ...(Items as T[]),
      ...(LastEvaluatedKey ? await recursiveScan(LastEvaluatedKey) : []),
    ]
  }

  return recursiveScan()
}
