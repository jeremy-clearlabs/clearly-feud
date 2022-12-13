import { useReducer } from 'react';

export const TEAM_ONE = 'TEAM_ONE';
export const TEAM_TWO = 'TEAM_TWO';

const initialState = {
  index: 0,
  round: 0,
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
    case 'RESET_ROUND':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const useGameController = (data) => {
  const [state, dispatch] = useReducer(reducer, initial(data, 0));
  const nextRound = (round) =>
    dispatch({ type: 'NEXT_ROUND', nextData: data[round] });
  const teamOneScore = (index) => dispatch({ type: 'TEAM_ONE_SCORES', index });
  const teamTwoScore = (index) => dispatch({ type: 'TEAM_TWO_SCORES', index });
  const setCurrentTeam = (currentTeam) =>
    dispatch({ type: 'SET_CURRENT_TEAM', currentTeam });

  return { ...state, nextRound, teamOneScore, teamTwoScore, setCurrentTeam };
};

export default useGameController;
