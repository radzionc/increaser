import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: '../app/**/!(*.d).{ts,tsx}',
  generates: {
    '../api/gql/schema.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
    './client/': {
      preset: 'client',
    },
  },
}

export default config
