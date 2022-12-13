import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGameControllerContext } from '../context/GameControllerContext';

const COLUMN_SIZE = 4;

function GamePage() {
  const navigate = useNavigate();
  const {
    index,
    round,
    question,
    answers,
    team1,
    team2,
    boardScore,
    outstandingPoints,
    nextRound,
    revealAnswer,
    awardTeamOne,
    awardTeamTwo,
  } = useGameControllerContext();

  useEffect(() => {
    if (round < index + 1) {
      navigate('/final-score');
    }
  }, [index, round, navigate]);

  return (
    <div className="App">
      <header className="">
        <h1 className="text-3xl font-bold underline">Game Round: {round}</h1>
      </header>
      <main className="Main">
        <div className="score" id="boardScore">
          {boardScore}
        </div>
        <h2 className="questionHolder">{question}</h2>
        <div className="score" id="team1">
          {team1.score}
        </div>
        <ul className="AnswerList flex list-disc gap-4">
          <li className="GameCol1 flex flex-col gap-1">
            {answers.slice(0, COLUMN_SIZE).map((answer, index) => (
              <div
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
                    onClick={() => revealAnswer(index)}
                  >
                    {index + 1}
                  </button>
                )}
              </div>
            ))}
          </li>
          <li className="GameCol2 flex flex-col gap-1">
            {answers.slice(COLUMN_SIZE).map((answer, index) => (
              <div
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
                    onClick={() => revealAnswer(index + COLUMN_SIZE)}
                  >
                    {index + 1 + COLUMN_SIZE}
                  </button>
                )}
              </div>
            ))}
          </li>
        </ul>
        <div className="score" id="team2">
          {team2.score}
        </div>
        <div className="btnHolder">
          <button
            className="GameButton rounded-pill w-24 "
            onClick={() => awardTeamOne()}
          >
            Award Team One
          </button>
          {answers.every((answer) => answer.revealed) ? (
            <button
              className="GameButton rounded-pill w-24 "
              onClick={() => nextRound(round)}
            >
              Next Round
            </button>
          ) : (
            <button
              className="GameButton rounded-pill w-24 "
              onClick={() => nextRound(round)}
            >
              New Round
            </button>
          )}
          <button
            className="GameButton rounded-pill w-24 "
            onClick={() => awardTeamTwo()}
          >
            Award Team Two
          </button>
        </div>
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
          <div>Outstanding Points: {outstandingPoints}</div>
        </section>
      </footer>
    </div>
  );
}

export default GamePage;
