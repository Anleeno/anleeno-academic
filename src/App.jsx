import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import './App.css';
import "./css/All.css"
import News from "./components/News.jsx";
import More from "./components/More.jsx";
import { useEffect } from "react";

function App() {

    useEffect(() => { document.title = "Shubo Xu · Academic"; }, []);

    useEffect(() => {
        const isMediaTarget = (target) => target instanceof Element && Boolean(target.closest("img, video"));
        const preventMediaAction = (event) => {
            if (isMediaTarget(event.target)) event.preventDefault();
        };

        document.addEventListener("contextmenu", preventMediaAction, true);
        document.addEventListener("dragstart", preventMediaAction, true);
        return () => {
            document.removeEventListener("contextmenu", preventMediaAction, true);
            document.removeEventListener("dragstart", preventMediaAction, true);
        };
    }, []);

    return (
        <div className="App">
            <Header />
            <div className="main-layout">
                <div className="left-hero">
                    <Hero />
                </div>
                <div className="right-content">
                    <div style={{margin: "2rem"}}>
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
