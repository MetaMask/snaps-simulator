import { PermissionConstraint } from '@metamask/permission-controller';
import {
  caveatMappers,
  restrictedMethodPermissionBuilders,
  selectHooks,
} from '@metamask/rpc-methods';
import {
  endowmentCaveatMappers,
  endowmentPermissionBuilders,
} from '@metamask/snaps-controllers';
import { SnapPermissions } from '@metamask/snaps-utils';
import { hasProperty } from '@metamask/utils';

export const ExcludedSnapEndowments = Object.freeze(['endowment:keyring']);

export const buildSnapEndowmentSpecifications = () =>
  Object.values(endowmentPermissionBuilders).reduce(
    (allSpecifications, { targetKey, specificationBuilder }) => {
      if (!ExcludedSnapEndowments.includes(targetKey)) {
        // @ts-expect-error Ignore for now
        allSpecifications[targetKey] = specificationBuilder();
      }
      return allSpecifications;
    },
    {},
  );

export const buildSnapRestrictedMethodSpecifications = (
  hooks: Record<string, unknown>,
) =>
  Object.values(restrictedMethodPermissionBuilders).reduce(
    (specifications, { targetKey, specificationBuilder, methodHooks }) => {
      // @ts-expect-error Ignore for now
      specifications[targetKey] = specificationBuilder({
        // @ts-expect-error Ignore for now
        methodHooks: selectHooks(hooks, methodHooks),
      });
      return specifications;
    },
    {},
  );

// Copied from the extension
/**
 * All unrestricted methods recognized by the PermissionController.
 * Unrestricted methods are ignored by the permission system, but every
 * JSON-RPC request seen by the permission system must correspond to a
 * restricted or unrestricted method, or the request will be rejected with a
 * "method not found" error.
 */
export const unrestrictedMethods = Object.freeze([
  'eth_blockNumber',
  'eth_call',
  'eth_chainId',
  'eth_coinbase',
  'eth_decrypt',
  'eth_estimateGas',
  'eth_feeHistory',
  'eth_gasPrice',
  'eth_getBalance',
  'eth_getBlockByHash',
  'eth_getBlockByNumber',
  'eth_getBlockTransactionCountByHash',
  'eth_getBlockTransactionCountByNumber',
  'eth_getCode',
  'eth_getEncryptionPublicKey',
  'eth_getFilterChanges',
  'eth_getFilterLogs',
  'eth_getLogs',
  'eth_getProof',
  'eth_getStorageAt',
  'eth_getTransactionByBlockHashAndIndex',
  'eth_getTransactionByBlockNumberAndIndex',
  'eth_getTransactionByHash',
  'eth_getTransactionCount',
  'eth_getTransactionReceipt',
  'eth_getUncleByBlockHashAndIndex',
  'eth_getUncleByBlockNumberAndIndex',
  'eth_getUncleCountByBlockHash',
  'eth_getUncleCountByBlockNumber',
  'eth_getWork',
  'eth_hashrate',
  'eth_mining',
  'eth_newBlockFilter',
  'eth_newFilter',
  'eth_newPendingTransactionFilter',
  'eth_protocolVersion',
  'eth_sendRawTransaction',
  'eth_sendTransaction',
  'eth_sign',
  'eth_signTypedData',
  'eth_signTypedData_v1',
  'eth_signTypedData_v3',
  'eth_signTypedData_v4',
  'eth_submitHashrate',
  'eth_submitWork',
  'eth_syncing',
  'eth_uninstallFilter',
  'metamask_getProviderState',
  'metamask_watchAsset',
  'net_listening',
  'net_peerCount',
  'net_version',
  'personal_ecRecover',
  'personal_sign',
  'wallet_watchAsset',
  'web3_clientVersion',
  'web3_sha3',
]);

export const processSnapPermissions = (
  initialPermissions: SnapPermissions,
): Record<string, Pick<PermissionConstraint, 'caveats'>> => {
  return Object.fromEntries(
    Object.entries(initialPermissions).map(([initialPermission, value]) => {
      if (hasProperty(caveatMappers, initialPermission)) {
        // @ts-expect-error Type not inferred?
        return [initialPermission, caveatMappers[initialPermission](value)];
      } else if (hasProperty(endowmentCaveatMappers, initialPermission)) {
        return [
          initialPermission,
          // @ts-expect-error Type not inferred?
          endowmentCaveatMappers[initialPermission](value),
        ];
      }

      // If we have no mapping, this may be a non-snap permission, return as-is
      return [
        initialPermission,
        value as Pick<PermissionConstraint, 'caveats'>,
      ];
    }),
  );
};
