import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Components
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

// Pages
import MainPage from "./pages/Main.tsx";
import RecordsPage from "./pages/Records.tsx";
import ArzondexPage from "./pages/Arzondex.tsx";
import ProfilePage from "./pages/Profile.tsx";

const App = () => {
    return (
        <Router basename="/arzon-website-v2">
            <div>
                <Header isScrollEffect={true}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/records" element={<RecordsPage/>}/>
                    <Route path="/arzondex" element={<ArzondexPage/>}/>
                    <Route path="/profile/:username" element={<ProfilePage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;