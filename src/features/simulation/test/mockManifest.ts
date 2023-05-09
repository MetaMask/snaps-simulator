import { SemVerVersion } from '@metamask/utils';

export const MOCK_MANIFEST = {
  version: '1.0.0' as SemVerVersion,
  description: 'The test example snap!',
  proposedName: '@metamask/example-snap',
  repository: {
    type: 'git' as const,
    url: 'https://github.com/MetaMask/example-snap.git',
  },
  source: {
    shasum: 'jf7x/ZXB+/oM+VFX0HThGDXf8aubOgD/RO0edGbDDqc=',
    location: {
      npm: {
        filePath: 'dist/bundle.js',
        packageName: '@metamask/example-snap',
        registry: 'https://registry.npmjs.org',
        iconPath: 'images/icon.svg',
      } as const,
    },
  },
  initialPermissions: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'endowment:rpc': { snaps: false, dapps: true },
  },
  manifestVersion: '0.1' as const,
};
