import React from 'react';
import Canvas from '../components/CanvasModel';
import Customizer from '../components/Customizer';
import Home from '../components/Home';

export default function Landing() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Customizer />
      <Canvas />
    </main>
  );
}
