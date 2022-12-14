import { useReducer } from "react";

export const TEAM_ONE = "TEAM_ONE";
export const TEAM_TWO = "TEAM_TWO";

export const initialState = {
  answers: [],
  boardScore: 0,
  fastMoneyScore: 0,
  currentTeam: TEAM_ONE,
  fastMoneyQuestions: [],
  fastMoneyAnswersFirst: [],
  fastMoneyAnswersSecond: [],
  index: 0,
  outstandingPoints: 0,
  question: "",
  revealed: [],
  round: 0,
  team1: { name: "", score: 0 },
  team2: { name: "", score: 0 },
  type: "",
};
const initial = (data, index) => ({
  ...initialState,
  ...data[index],
  answers: data[index].answers.map((answer) => ({
    ...answer,
    revealed: false,
  })),
  fastMoneyQuestions: data.filter(({ type }) => type === "fast-money"),
  index,
});

function reducer(state, action) {
  console.log("action.type", action.type);
  switch (action.type) {
    case "SET_CURRENT_TEAM":
      return { ...state, currentTeam: action.currentTeam };
    case "NEXT_ROUND":
      return {
        ...state,
        ...action.nextData,
        index: state.index + 1,
        answers: action.nextData.answers.map((answer) => ({
          ...answer,
          revealed: false,
        })),
      };
    case "REVEAL_ANSWER":
      return {
        ...state,
        outstandingPoints:
          state.outstandingPoints + state.answers[action.index].points,
        boardScore: state.answers[action.index].points,
        answers: [
          ...state.answers.slice(0, action.index),
          { ...state.answers[action.index], revealed: true },
          ...state.answers.slice(action.index + 1),
        ],
      };
    case "AWARD_TEAM_ONE":
      return {
        ...state,
        outstandingPoints: 0,
        team1: {
          ...state.team1,
          score: state.team1.score + state.outstandingPoints,
        },
      };
    case "AWARD_TEAM_TWO":
      return {
        ...state,
        outstandingPoints: 0,
        team2: {
          ...state.team2,
          score: state.team2.score + state.outstandingPoints,
        },
      };
    case "FAST_MONEY_SCORE_TEAM_ONE":
      return {
        ...state,
        fastMoneyScore: 0,
        team1: {
          ...state.team1,
          score: state.team1.score + state.fastMoneyScore,
        },
      };
    case "FAST_MONEY_SCORE_TEAM_TWO":
      return {
        ...state,
        fastMoneyScore: 0,
        team2: {
          ...state.team2,
          score: state.team2.score + state.fastMoneyScore,
        },
      };
    case "TEAM_ONE_SCORES":
      return {
        ...state,
        answers: [
          ...state.answers.slice(0, action.index),
          { ...state.answers[action.index], revealed: true },
          ...state.answers.slice(action.index + 1),
        ],
        team1: {
          ...state.team1,
          score: state.team1.score + state.answers[action.index].points,
        },
      };
    case "TEAM_TWO_SCORES":
      return {
        ...state,
        answers: [
          ...state.answers.slice(0, action.index),
          { ...state.answers[action.index], revealed: true },
          ...state.answers.slice(action.index + 1),
        ],
        team2: {
          ...state.team2,
          score: state.team2.score + state.answers[action.index].points,
        },
      };
    case "EVALUATE_ANSWERS_FIRST":
      return {
        ...state,
        fastMoneyAnswersFirst: action.fastMoneyAnswers,
        fastMoneyScore: state.fastMoneyScore + (action.fastMoneyScore || 0),
      };
    case "EVALUATE_ANSWERS_SECOND":
      return {
        ...state,
        fastMoneyAnswersSecond: action.fastMoneyAnswers,
        fastMoneyScore: state.fastMoneyScore + (action.fastMoneyScore || 0),
      };
    case "END_GAME":
      return {
        ...state,
        index: state.index + 1,
      };
    case "RESET_GAME":
      return initial(action.data, 0);
    default:
      return state;
  }
}

const useGameController = (data) => {
  const [state, dispatch] = useReducer(reducer, initial(data, 0));
  const nextRound = (round) => {
    if (data?.[round]) {
      return dispatch({ type: "NEXT_ROUND", nextData: data?.[round] || {} });
    }
    return dispatch({ type: "END_GAME" });
  };
  const teamOneScore = (index) => dispatch({ type: "TEAM_ONE_SCORES", index });
  const teamTwoScore = (index) => dispatch({ type: "TEAM_TWO_SCORES", index });
  const revealAnswer = (index) => dispatch({ type: "REVEAL_ANSWER", index });
  const awardTeamOne = () => dispatch({ type: "AWARD_TEAM_ONE" });
  const awardTeamTwo = () => dispatch({ type: "AWARD_TEAM_TWO" });
  const fastMoneyScoreTeamOne = () =>
    dispatch({ type: "FAST_MONEY_SCORE_TEAM_ONE" });
  const fastMoneyScoreTeamTwo = () =>
    dispatch({ type: "FAST_MONEY_SCORE_TEAM_TWO" });
  const resetGame = () => dispatch({ type: "RESET_GAME", data });
  const evaluateAnswersFirst = (answers) => {
    const fastMoneyAnswers = state.fastMoneyQuestions.map((question, index) => {
      const final = question.answers.find(
        (a) =>
          a.answer.toLowerCase().trim() === answers[index].toLowerCase().trim()
      );
      if (!final) {
        return { answer: "", points: 0 };
      }
      return final;
    });
    const fastMoneyScore = fastMoneyAnswers.reduce(
      (acc, { points }) => acc + points,
      0
    );
    dispatch({
      type: "EVALUATE_ANSWERS_FIRST",
      fastMoneyAnswers,
      fastMoneyScore,
    });
  };
  const evaluateAnswersSecond = (answers) => {
    const fastMoneyAnswers = state.fastMoneyQuestions.map((question, index) => {
      const final = question.answers.find(
        (a) =>
          a.answer.toLowerCase().trim() === answers[index].toLowerCase().trim()
      );
      if (!final) {
        return { answer: "", points: 0 };
      }
      return final;
    });
    const fastMoneyScore = fastMoneyAnswers.reduce(
      (acc, { points }) => acc + points,
      0
    );
    dispatch({
      type: "EVALUATE_ANSWERS_SECOND",
      fastMoneyAnswers,
      fastMoneyScore,
    });
  };
  const setCurrentTeam = (currentTeam) =>
    dispatch({ type: "SET_CURRENT_TEAM", currentTeam });

  return {
    ...state,
    nextRound,
    teamOneScore,
    teamTwoScore,
    setCurrentTeam,
    revealAnswer,
    awardTeamOne,
    awardTeamTwo,
    fastMoneyScoreTeamOne,
    fastMoneyScoreTeamTwo,
    evaluateAnswersFirst,
    evaluateAnswersSecond,
    resetGame,
  };
};

export default useGameController;
