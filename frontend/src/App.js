import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import ProfitTargets from './components/ProfitTargets';
import Benefits from './components/Benefits';
import About from './components/About';
import Connect from './components/Connect';
import Footer from './components/Footer';

const Home = () => (
  <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
    <Navbar />
    <main>
      <Hero />
      <Calculator />
      <ProfitTargets />
      <Benefits />
      <About />
      <Connect />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
