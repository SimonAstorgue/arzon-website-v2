import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client'
import {StyledEngineProvider, ThemeProvider} from "@mui/material";

// Theme, Style
import './index.css'
import themeMUI from "./theme/themeMUI.ts";

import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={themeMUI}>
        <StrictMode>
            <StyledEngineProvider injectFirst>
                <App/>
            </StyledEngineProvider>
        </StrictMode>
    </ThemeProvider>
)
