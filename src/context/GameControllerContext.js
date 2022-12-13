import React, { useContext } from 'react';

import data from '../data';
import useGameController, { initialState } from '../hooks/useGameController';

const GameControllerContext = React.createContext({
  ...initialState,
});
const { Consumer, Provider } = GameControllerContext;

const GameControllerProvider = ({ gameData = data, children }) => {
  const value = useGameController(gameData);

  return <Provider value={value}>{children}</Provider>;
};

export {
  GameControllerProvider as Provider,
  Consumer,
  GameControllerContext as Context,
};

export default GameControllerContext;

export const useGameControllerContext = () => useContext(GameControllerContext);
