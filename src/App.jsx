import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Slider from './components/Slider';

function App() {
  return (
    <div>
      <Slider url={'https://picsum.photos/v2/list'} page={'1'} limit={'6'} />
    </div>
  );
}

export default App;
