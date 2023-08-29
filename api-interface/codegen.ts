import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: '../app/**/!(*.d).{ts,tsx}',
  config: {
    maybeValue: 'T | undefined',
    inputMaybeValue: 'T | undefined',
  },
  generates: {
    '../api/gql/schema.ts': {
      plugins: [
        {
          typescript: {
            enumsAsConst: true,
          },
        },
        'typescript-resolvers',
      ],
    },
    './client/': {
      preset: 'client',
      config: {
        enumsAsTypes: true,
      },
    },
  },
}

export default config
