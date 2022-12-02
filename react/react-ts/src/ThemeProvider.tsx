import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface IProps {
    children: React.ReactNode;
}

export default function ThemeProvider({ children }: IProps) {
    const theme = createTheme({
        // Visit the link below to see what you can customize.
        // https://mui.com/material-ui/customization/theming/#theme-provider
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
}
