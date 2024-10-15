import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Components
import Header from "./components/Header.tsx";
import MainPage from "./pages/Main.tsx";
import Footer from "./components/Footer.tsx";
import RecordsPage from "./pages/Records.tsx";

const App = () => {
    return (
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
    );
}

export default App;