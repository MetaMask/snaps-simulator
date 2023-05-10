import { SnapManifest, SnapManifestStruct } from '@metamask/snaps-utils';

type ValidatorContext = {
  sourceCode: string;
  icon: string;
};

type ValidatorFunction = (
  value: SnapManifest,
  context: ValidatorContext,
) => Promise<boolean | string>;

export type Validator = {
  name: string;
  manifestName: string;
  validator: ValidatorFunction;
};

export const validators: Validator[] = [
  {
    name: 'Title',
    manifestName: 'proposedName',
    validator: async (manifest: SnapManifest) => {
      const [error] = SnapManifestStruct.schema.proposedName.validate(
        manifest.proposedName,
      );
      return error?.message ?? true;
    },
  },
  {
    name: 'Description',
    manifestName: 'description',
    validator: async (manifest: SnapManifest) => {
      const [error] = SnapManifestStruct.schema.description.validate(
        manifest.description,
      );
      return error?.message ?? true;
    },
  },
  {
    name: 'Icon',
    manifestName: 'icon',
    validator: async (manifest: SnapManifest, { icon }) => {
      const [error] =
        SnapManifestStruct.schema.source.schema.location.schema.npm.schema.iconPath.validate(
          manifest.source.location.npm.iconPath,
        );

      if (error) {
        return error.message;
      }

      if (!icon) {
        return 'Unable to load icon.';
      }

      return true;
    },
  },
  {
    name: 'Permissions',
    manifestName: 'initialPermissions',
    validator: async (manifest: SnapManifest) => {
      const [error] = SnapManifestStruct.schema.initialPermissions.validate(
        manifest.initialPermissions,
      );
      return error?.message ?? true;
    },
  },
  {
    name: 'Checksum',
    manifestName: 'source.shasum',
    validator: async () => {
      // TODO: Fetch all required files for calculating checksum.
      return true;
    },
  },
  {
    name: 'Bundle',
    manifestName: 'filePath',
    validator: async (manifest: SnapManifest, { sourceCode }) => {
      const [error] =
        SnapManifestStruct.schema.source.schema.location.schema.npm.schema.filePath.validate(
          manifest.source.location.npm.filePath,
        );

      if (error) {
        return error.message;
      }

      if (!sourceCode) {
        return 'Unable to load bundle.';
      }

      return true;
    },
  },
];
