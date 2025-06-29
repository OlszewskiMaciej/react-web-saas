import { createTheme } from '@mui/material/styles';
import type { Theme, PaletteOptions, ThemeOptions } from '@mui/material/styles';

// Shared theme configuration based on PlumeUI design
const baseTheme: Partial<ThemeOptions> = {
  typography: {
    fontFamily: '"Geist", "Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4.5rem', // 7xl
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3.75rem', // 6xl
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '3rem', // 5xl
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontSize: '2.25rem', // 4xl
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontSize: '1.875rem', // 3xl
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: 'normal',
    },
    h6: {
      fontSize: '1.5rem', // 2xl
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: 'normal',
    },
    body1: {
      fontSize: '1rem', // base
      lineHeight: 1.5,
      letterSpacing: 'normal',
    },
    body2: {
      fontSize: '0.875rem', // sm
      lineHeight: 1.5,
      letterSpacing: 'normal',
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          '&:hover': {
            transform: 'translateY(-1px)',
          }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
          borderRadius: 8,
          transition: 'transform 0.2s, box-shadow 0.2s',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          '@media (min-width: 600px)': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
        }
      }
    }
  },
};

// Light mode palette - PlumeUI inspired
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    50: '#EDF5FF',
    100: '#D8E8FE',
    200: '#BCD9FE',
    300: '#90C4FD',
    400: '#5DA3FA',
    500: '#3980F6',
    600: '#2160EB',
    700: '#1A4CD8',
    800: '#1C3EAF',
    900: '#1D398A',
    main: '#3980F6',
    light: '#90C4FD',
    dark: '#1A4CD8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#1C3EAF',
    light: '#5DA3FA',
    dark: '#1A4CD8',
    contrastText: '#ffffff',
  },
  neutral: {
    50: '#F6F8FB',
    100: '#EFF1F6',
    200: '#DFE3EB',
    300: '#C9D0DB',
    400: '#979FAD',
    500: '#666E7D',
    600: '#485261',
    700: '#323C4D',
    800: '#1D2736',
    900: '#0E1524',
  },
  success: {
    main: '#00A025',
    light: '#46C867',
    dark: '#008A06',
    contrastText: '#ffffff',
  },
  error: {
    main: '#F54533',
    light: '#FF866D',
    dark: '#DC271F',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#DD6020',
    light: '#FF9561',
    dark: '#C54A04',
    contrastText: '#ffffff',
  },
  background: {
    default: '#F6F8FB', // Neutral-50
    paper: '#ffffff',
  },
  text: {
    primary: '#0E1524', // Neutral-900
    secondary: '#485261', // Neutral-600
  },
  divider: '#DFE3EB', // Neutral-200
};

// Dark mode palette - PlumeUI inspired
const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    50: '#EDF5FF',
    100: '#D8E8FE',
    200: '#BCD9FE',
    300: '#90C4FD',
    400: '#5DA3FA',
    500: '#3980F6',
    600: '#2160EB',
    700: '#1A4CD8',
    800: '#1C3EAF',
    900: '#1D398A',
    main: '#5DA3FA',
    light: '#90C4FD',
    dark: '#3980F6',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#90C4FD',
    light: '#BCD9FE',
    dark: '#5DA3FA',
    contrastText: '#0E1524',
  },
  neutral: {
    50: '#F6F8FB',
    100: '#EFF1F6',
    200: '#DFE3EB',
    300: '#C9D0DB',
    400: '#979FAD',
    500: '#666E7D',
    600: '#485261',
    700: '#323C4D',
    800: '#1D2736',
    900: '#0E1524',
  },
  success: {
    main: '#46C867',
    light: '#80DA8E',
    dark: '#00A025',
    contrastText: '#0E1524',
  },
  error: {
    main: '#FF866D',
    light: '#FFA891',
    dark: '#F54533',
    contrastText: '#0E1524',
  },
  warning: {
    main: '#FF9561',
    light: '#FFB289',
    dark: '#DD6020',
    contrastText: '#0E1524',
  },
  background: {
    default: '#0E1524', // Neutral-900
    paper: '#1D2736', // Neutral-800
  },
  text: {
    primary: '#F6F8FB', // Neutral-50
    secondary: '#C9D0DB', // Neutral-300
  },
  divider: '#323C4D', // Neutral-700
};

// Create base theme with palette
const createBaseTheme = (palette: PaletteOptions) => createTheme({
  ...baseTheme,
  palette,
} as ThemeOptions);

// Create the light and dark themes
const baseLightTheme = createBaseTheme(lightPalette);
const baseDarkTheme = createBaseTheme(darkPalette);

// Common responsive typography for both themes
const responsiveTypography = {
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 800,
          '@media (max-width: 1200px)': {
            fontSize: '3.5rem',
          },
          '@media (max-width: 900px)': {
            fontSize: '3rem',
          },
          '@media (max-width: 600px)': {
            fontSize: '2.5rem',
          },
        },
        h2: {
          fontWeight: 700,
          '@media (max-width: 1200px)': {
            fontSize: '3rem',
          },
          '@media (max-width: 900px)': {
            fontSize: '2.5rem',
          },
          '@media (max-width: 600px)': {
            fontSize: '2rem',
          },
        },
        h3: {
          '@media (max-width: 900px)': {
            fontSize: '2.25rem',
          },
          '@media (max-width: 600px)': {
            fontSize: '1.875rem',
          },
        },
        h4: {
          '@media (max-width: 900px)': {
            fontSize: '1.875rem',
          },
          '@media (max-width: 600px)': {
            fontSize: '1.5rem',
          },
        },
        h5: {
          '@media (max-width: 600px)': {
            fontSize: '1.25rem',
          },
        },
        h6: {
          '@media (max-width: 600px)': {
            fontSize: '1.125rem',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1280px !important',
        },
      },
    },
  },
};

export const lightTheme = createTheme(baseLightTheme, responsiveTypography);
export const darkTheme = createTheme(baseDarkTheme, responsiveTypography);
