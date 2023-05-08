import {
  JsonRpcEngineEndCallback,
  JsonRpcEngineNextCallback,
  JsonRpcMiddleware,
  JsonRpcRequest,
  PendingJsonRpcResponse,
} from 'json-rpc-engine';

export const methodHandlers = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  metamask_getProviderState: getProviderStateHandler,
};

/**
 * A mock handler for metamask_getProviderState that always returns a specific hardcoded result.
 *
 * @param _request - Incoming JSON-RPC request, ignored for this specific handler.
 * @param result - The outgoing JSON-RPC response, modified to return the result.
 * @param _next - The json-rpc-engine middleware next handler.
 * @param end - The json-rpc-engine middleware end handler.
 */
async function getProviderStateHandler(
  _request: JsonRpcRequest<unknown>,
  result: PendingJsonRpcResponse<unknown>,
  _next: JsonRpcEngineNextCallback,
  end: JsonRpcEngineEndCallback,
) {
  // For now this will return a mocked result, this should probably match whatever network we are talking to
  result.result = {
    isUnlocked: true,
    chainId: '0x01',
    networkVersion: '0x01',
    accounts: [],
  };
  return end();
}

/**
 * Creates a middleware for handling misc RPC methods normally handled internally by the MM client.
 *
 * @returns Nothing.
 */
export function createMiscMethodMiddleware(): JsonRpcMiddleware<
  unknown,
  unknown
> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return async function methodMiddleware(request, response, next, end) {
    const handler =
      methodHandlers[request.method as keyof typeof methodHandlers];
    if (handler) {
      try {
        // Implementations may or may not be async, so we must await them.
        return await handler(request, response, next, end);
      } catch (error: any) {
        console.error(error);
        return end(error);
      }
    }

    return next();
  };
}
