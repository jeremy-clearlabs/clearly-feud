import { useNavigate } from 'react-router-dom';

import { useGameControllerContext } from '../context/GameControllerContext';

function FinalScorePage() {
  const navigate = useNavigate();
  const { team1, team2, resetGame } = useGameControllerContext();

  return (
    <div className="App">
      <header className="">
        <h1 className="text-3xl font-bold underline">Final Results</h1>
      </header>
      <main className="Main">
        <div className="text-3xl font-bold underline" id="team1">
          Team One: {team1.score}
        </div>
        <div className="text-3xl font-bold underline" id="team2">
          Team Two: {team2.score}
        </div>
      </main>
      <footer>
        <button
          className="rounded"
          onClick={() => {
            resetGame();
            navigate('/');
          }}
        >
          Reset
        </button>
      </footer>
    </div>
  );
}

export default FinalScorePage;
