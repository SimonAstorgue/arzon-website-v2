import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client'
import {StyledEngineProvider, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Theme, Style
import './index.css'
import themeMUI from "./theme/themeMUI.ts";

// Components
import Header from "./components/Header.tsx";
import MainPage from "./pages/Main.tsx";
import Footer from "./components/Footer.tsx";
import RecordsPage from "./pages/Records.tsx";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={themeMUI}>
        <StrictMode>
            <StyledEngineProvider injectFirst>
                <Router>
                    <div>
                        <Header isScrollEffect={true}/>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/records" element={<RecordsPage/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </Router>
            </StyledEngineProvider>
        </StrictMode>
    </ThemeProvider>
)
