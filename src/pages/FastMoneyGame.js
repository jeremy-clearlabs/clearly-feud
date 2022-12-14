import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useGameControllerContext } from "../context/GameControllerContext";
import { TEAM_ONE } from "../hooks/useGameController";

function GamePage() {
  const navigate = useNavigate();
  const {
    currentTeam,
    fastMoneyScoreTeamOne,
    fastMoneyScoreTeamTwo,
    fastMoneyScore,
    fastMoneyAnswersFirst,
    fastMoneyAnswersSecond,
    fastMoneyQuestions,
    evaluateAnswersFirst,
    evaluateAnswersSecond,
  } = useGameControllerContext();

  const currentTeamToString = () => {
    if (currentTeam === TEAM_ONE) {
      return "Team One";
    } else {
      return "Team Two";
    }
  };

  const { register: registerFirst, handleSubmit: handleSubmitFirst } = useForm({
    defaultValues: {},
  });
  const onFirstSubmit = (data) => {
    evaluateAnswersFirst(Object.values(data));
  };

  const { register: registerSecond, handleSubmit: handleSubmitSecond } =
    useForm({
      defaultValues: {},
    });
  const onSecondSubmit = (data) => {
    evaluateAnswersSecond(Object.values(data));
  };

  return (
    <div className="App">
      <header className="">
        <h1 className="text-3xl font-bold underline">Game Round: Fast Money</h1>
        <h2 className="text-2xl font-bold">
          Current Team: {currentTeamToString()}
        </h2>
      </header>
      <main className="Main">
        <div className="score" id="boardScore">
          {fastMoneyScore}
        </div>
        <ul className="AnswerList flex list-disc gap-4">
          <li className="GameCol1 flex flex-col gap-1">
            <form onSubmit={handleSubmitFirst(onFirstSubmit)}>
              {fastMoneyQuestions.map((_, index) => (
                <div
                  className="GameButton flex justify-center items-center"
                  key={index.toString()}
                >
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...registerFirst(`first-answer-${index}`)}
                  />
                  <div className="LBG">
                    {fastMoneyAnswersFirst?.[index]?.points}
                  </div>
                </div>
              ))}
              <button className="GameButton rounded-pill w-24 " type="submit">
                Player One
              </button>
            </form>
          </li>
          <li className="GameCol1 flex flex-col gap-1">
            <form onSubmit={handleSubmitSecond(onSecondSubmit)}>
              {fastMoneyQuestions.map((_, index) => (
                <div
                  className="GameButton flex justify-center items-center"
                  key={index.toString()}
                >
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...registerSecond(`second-answer-${index}`)}
                  />
                  <div className="LBG">
                    {fastMoneyAnswersSecond?.[index]?.points}
                  </div>
                </div>
              ))}
              <button className="GameButton rounded-pill w-24 " type="submit">
                Player Two
              </button>
            </form>
          </li>
        </ul>
        <div className="btnHolder">
          <button
            className="GameButton rounded-pill w-24 "
            onClick={() => fastMoneyScoreTeamOne()}
          >
            Award Team One
          </button>
          <button
            className="GameButton rounded-pill w-24 "
            onClick={() => navigate("/final-score")}
          >
            Finish Round
          </button>
          <button
            className="GameButton rounded-pill w-24 "
            onClick={() => fastMoneyScoreTeamTwo()}
          >
            Award Team Two
          </button>
        </div>
      </main>
      <footer>
        <section>
          {/* <div>Outstanding Points: {outstandingPoints}</div> */}
        </section>
      </footer>
    </div>
  );
}

export default GamePage;
