import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxl: true;
    }}

const themeMUI = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default themeMUI;  // Export the theme for use in the application