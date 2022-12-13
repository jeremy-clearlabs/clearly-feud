// import { Link } from 'react-router-dom';
import data from '../data';
import useGameController, {
  TEAM_ONE,
  TEAM_TWO,
} from '../hooks/useGameController';

const COLUMN_SIZE = 4;

function GamePage() {
  const {
    round,
    question,
    answers,
    currentTeam,
    team1,
    team2,
    nextRound,
    setCurrentTeam,
    teamOneScore,
    teamTwoScore,
  } = useGameController(data);
  const scoreForTeam = (index) => {
    if (currentTeam === TEAM_ONE) {
      teamOneScore(index);
    } else if (currentTeam === TEAM_TWO) {
      teamTwoScore(index);
    }
  };
  const toggleSelectedTeam = () => {
    if (currentTeam === TEAM_ONE) {
      setCurrentTeam(TEAM_TWO);
    } else if (currentTeam === TEAM_TWO) {
      setCurrentTeam(TEAM_ONE);
    }
  };
  return (
    <div className="App">
      <header className="">
        <h1 className="text-3xl font-bold underline">Game Round: {round}</h1>
      </header>
      <main class="Main">
        <h2 className="questionHolder">{question}</h2>
        <ul className="AnswerList flex list-disc gap-4">
          <li className="GameCol1 flex flex-col gap-1">
            {answers.slice(0, COLUMN_SIZE).map((answer, index) => (
              <li
                className="GameButton flex justify-center items-center"
                key={index.toString()}
              >
                {answer.revealed ? (
                  <div className="flex flex-auto h-12 justify-center items-center">
                    <div className="flex-1 border-r-2 border-blue-700">
                      {answer.answer}
                    </div>
                    <div className="LBG">{answer.points}</div>
                  </div>
                ) : (
                  <button
                    className="rounded flex-auto h-12"
                    onClick={() => scoreForTeam(index)}
                  >
                    {index + 1}
                  </button>
                )}
              </li>
            ))}
          </li>
          <li className="GameCol2 flex flex-col gap-1">
            {answers.slice(COLUMN_SIZE).map((answer, index) => (
              <li
                className="GameButton flex justify-center items-center"
                key={index.toString()}
              >
                {answer.revealed ? (
                  <div className="flex flex-auto h-12 justify-center items-center">
                    <div className="flex-1 border-r-2 border-blue-700">
                      {answer.answer}
                    </div>
                    <div className="LBG">{answer.points}</div>
                  </div>
                ) : (
                  <button
                    className="rounded flex-auto h-12"
                    onClick={() => scoreForTeam(index + COLUMN_SIZE)}
                  >
                    {index + 1 + COLUMN_SIZE}
                  </button>
                )}
              </li>
            ))}
          </li>
        </ul>
      </main>
      <footer>
        {answers.every((answer) => answer.revealed) && (
          <button
            className="rounded-pill w-24 "
            onClick={() => nextRound(round)}
          >
            Next Round
          </button>
        )}
        <section>
          <div>Scores:</div>
          <ul>
            <li className="flex">
              <div>Team One:&nbsp;</div>
              <div>{team1.score}</div>
            </li>
            <li className="flex">
              <div>Team Two:&nbsp;</div>
              <div>{team2.score}</div>
            </li>
          </ul>
        </section>
        <section onClick={toggleSelectedTeam}>
          Current Team: {currentTeam}
        </section>
      </footer>
    </div>
  );
}

export default GamePage;
