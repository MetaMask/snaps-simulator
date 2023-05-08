import { defineStyleConfig, extendTheme } from '@chakra-ui/react';

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
