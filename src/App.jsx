import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import './App.css';
import "./css/All.css";
import News from "./components/News.jsx";
import More from "./components/More.jsx";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="main-layout">
                <div className="left-hero">
                    <Hero />
                </div>
                <div className="right-content">
                    <div className="content-shell">
                        <About />
                        <News />
                        <Publications />
                        <Experience />
                        <More />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
