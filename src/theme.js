import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          level1: '#121212',
          level2: '#1a1a1a',
        },
        text: {
          primary: '#fff',
        },
      },
    },
  },
});

export default theme;