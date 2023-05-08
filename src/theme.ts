import { defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { BaseThemeTypings } from '@chakra-ui/styled-system';

declare module '@chakra-ui/styled-system' {
  export type CustomThemeTypings = {
    borders: {
      muted: string;
    };
    colors: {
      gray: {
        muted: string;
      };
    };
  } & BaseThemeTypings;
}

export const theme = extendTheme({
  borders: {
    muted: '1px solid #D6D9DC',
  },
  colors: {
    gray: {
      muted: '#D6D9DC',
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

    Heading: defineStyleConfig({
      baseStyle: {
        fontFamily: 'Euclid Circular B, sans-serif',
      },
    }),
  },
});
