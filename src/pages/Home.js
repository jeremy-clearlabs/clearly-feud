import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="Home">
      <header>
        <div className="outer-logo">
          <h1 className="logo">Clear Feud</h1>
        </div>
        <Link to="game">
          <button>New Game</button>
        </Link>
      </header>
    </div>
  );
}

export default HomePage;
