/* eslint-disable @typescript-eslint/naming-convention */

import { tagAnatomy } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyleConfig,
  extendTheme,
} from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

export const theme = extendTheme({
  borders: {
    muted: '1px solid #D6D9DC',
  },

  colors: {
    background: {
      alternative: '#F2F4F6',
    },
    gray: {
      muted: '#D6D9DC',
      40: '#F2F4F6',
    },
  },

  components: {
    Container: defineStyleConfig({
      baseStyle: {
        paddingX: 4,
        paddingY: 4,
      },
      sizes: {
        fullWidth: {
          maxWidth: '100%',
        },
      },
    }),

    Divider: defineStyleConfig({
      baseStyle: {
        opacity: 1,
      },
    }),

    Tag: defineMultiStyleConfig({
      variants: {
        code: definePartsStyle({
          container: {
            background: '#F2F4F6',
            borderRadius: '0px',
            fontWeight: 'normal',
            fontFamily: 'code',
          },
        }),
      },
    }),
  },

  fonts: {
    heading: `'Euclid Circular B', sans-serif`,
    body: `'Euclid Circular B', sans-serif`,
    code: `'IBM Plex Mono', monospace`,
  },

  styles: {
    global: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '#root': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
    },
  },
});
