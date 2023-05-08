export const JSON_RPC_SCHEMA_URL = 'http://json-schema.org/draft-04/schema#';
export const JSON_RPC_SCHEMA = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    jsonrpc: {
      type: 'string',
    },
    id: {
      oneOf: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
    },
    method: {
      type: 'string',
    },
    params: {
      oneOf: [
        {
          type: 'object',
          properties: {
            hello: {
              type: 'string',
            },
          },
          required: ['hello'],
        },
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      ],
    },
  },
  required: ['jsonrpc', 'id', 'method'],
};

export const SAMPLE_JSON_RPC_REQUEST = `
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "subtract",
  "params": [42, 23]
}
`.trimStart();
