import {
  JsonRpcEngineEndCallback,
  JsonRpcEngineNextCallback,
  JsonRpcMiddleware,
  JsonRpcRequest,
  PendingJsonRpcResponse,
} from 'json-rpc-engine';

export const methodHandlers = {
  'metamask_getProviderState': getProviderStateHandler,
};

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

export function createMiscMethodMiddleware(): JsonRpcMiddleware<
  unknown,
  unknown
> {
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
