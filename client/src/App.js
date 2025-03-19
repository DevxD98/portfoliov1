import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Music from './components/Music/Music';

const App = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <div className="snap-start h-screen bg-white">
        <Hero />
      </div>
      <div className="snap-start h-screen bg-gray-50">
        <About />
      </div>
      <div className="snap-start h-screen bg-white">
        <Projects />
      </div>
      <div className="snap-start min-h-screen bg-white">
        <Music />
      </div>
    </div>
  );
}

export default App;
