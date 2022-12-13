import { useReducer } from 'react';

export const TEAM_ONE = 'TEAM_ONE';
export const TEAM_TWO = 'TEAM_TWO';

export const initialState = {
  index: 0,
  round: 0,
  boardScore: 0,
  outstandingPoints: 0,
  type: '',
  question: '',
  answers: [],
  revealed: [],
  team1: { name: '', score: 0 },
  team2: { name: '', score: 0 },
  currentTeam: TEAM_ONE,
};
const initial = (data, index) => ({
  ...initialState,
  ...data[index],
  answers: data[index].answers.map((answer) => ({
    ...answer,
    revealed: false,
  })),
  index,
});

function reducer(state, action) {
  console.log('action.type', action.type);
  switch (action.type) {
    case 'SET_CURRENT_TEAM':
      return { ...state, currentTeam: action.currentTeam };
    case 'NEXT_ROUND':
      return {
        ...state,
        ...action.nextData,
        index: state.index + 1,
        answers: action.nextData.answers.map((answer) => ({
          ...answer,
          revealed: false,
        })),
      };
    case 'REVEAL_ANSWER':
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
    case 'AWARD_TEAM_ONE':
      return {
        ...state,
        outstandingPoints: 0,
        team1: {
          ...state.team1,
          score: state.team1.score + state.outstandingPoints,
        },
      };
    case 'AWARD_TEAM_TWO':
      return {
        ...state,
        outstandingPoints: 0,
        team2: {
          ...state.team1,
          score: state.team1.score + state.outstandingPoints,
        },
      };
    case 'TEAM_ONE_SCORES':
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
    case 'TEAM_TWO_SCORES':
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
    case 'END_GAME':
      return {
        ...state,
        index: state.index + 1,
      };
    case 'RESET_GAME':
      return initial(action.data, 0);
    default:
      return state;
  }
}

const useGameController = (data) => {
  const [state, dispatch] = useReducer(reducer, initial(data, 0));
  const nextRound = (round) => {
    if (data?.[round]) {
      return dispatch({ type: 'NEXT_ROUND', nextData: data?.[round] || {} });
    }
    return dispatch({ type: 'END_GAME' });
  };
  const teamOneScore = (index) => dispatch({ type: 'TEAM_ONE_SCORES', index });
  const teamTwoScore = (index) => dispatch({ type: 'TEAM_TWO_SCORES', index });
  const revealAnswer = (index) => dispatch({ type: 'REVEAL_ANSWER', index });
  const awardTeamOne = () => dispatch({ type: 'AWARD_TEAM_ONE' });
  const awardTeamTwo = () => dispatch({ type: 'AWARD_TEAM_TWO' });
  const resetGame = () => dispatch({ type: 'RESET_GAME', data });
  const setCurrentTeam = (currentTeam) =>
    dispatch({ type: 'SET_CURRENT_TEAM', currentTeam });

  return {
    ...state,
    nextRound,
    teamOneScore,
    teamTwoScore,
    setCurrentTeam,
    revealAnswer,
    awardTeamOne,
    awardTeamTwo,
    resetGame,
  };
};

export default useGameController;
