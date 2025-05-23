import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";

// Components
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

// Pages
import MainPage from "./pages/Main.tsx";
import RecordsPage from "./pages/Records.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArzondexPage from "./pages/Arzondex.jsx";
import ProfilePage from "./pages/Profile.tsx";
import {useEffect, useState} from "react";
import {AuthProvider} from "./context/AuthContext.tsx";

const AppRoutes = () => {
    const location = useLocation();
    const [isScrollEffect, setIsScrollEffect] = useState(true);

    useEffect(() => {
        setIsScrollEffect(location.pathname === '/');
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <AuthProvider>
            <div className={`bg-zinc-100 dark:bg-zinc-800`} id="app">
                <Header isScrollEffect={isScrollEffect}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/records" element={<RecordsPage/>}/>
                    <Route path="/arzondex" element={<ArzondexPage/>}/>
                    <Route path="/profile/:userId" element={<ProfilePage/>}/>
                </Routes>
                <Footer/>
            </div>
        </AuthProvider>
    );
}

const App = () => (
    <Router
        basename="/arzon-website-v2/"
        future={{v7_startTransition: true}}>
        <AppRoutes/>
    </Router>
)

export default App;