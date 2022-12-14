import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import FinalScorePage from './pages/FinalScorePage';
import FastMoneyGame from './pages/FastMoneyGame';
import * as GameControllerContext from './context/GameControllerContext';

function App() {
  return (
    <BrowserRouter>
      <GameControllerContext.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/fast-money" element={<FastMoneyGame />} />
          <Route path="/final-score" element={<FinalScorePage />} />
        </Routes>
      </GameControllerContext.Provider>
    </BrowserRouter>
  );
}

export default App;
