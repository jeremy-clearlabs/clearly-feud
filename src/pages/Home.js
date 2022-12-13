import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="Home">
      <header className="">
        <h1 className="text-3xl font-bold underline">Clear Feud</h1>
        <Link to="game">
          <button>New Game</button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;
