import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button, View,  Text } from 'react-native';
import { AuthContext } from '../../../AuthContext';

// (_) Change to svg/animations; fadeIn-aninmate || fadeOut-unAnimate 
const State = {
  EMPTY: " ",
  X: "X",
  O: "0",
};

const TicTacToe = () => {
  const auth = useContext(AuthContext);

  const [cellState, setCellState] = useState((new Array(9)).fill(State.EMPTY));

  const [currentUser, setCurrentUser] = useState(null); // need to change to this.getSessionCreatorUserId()

  const onSessionDataChanged = (data: { cell_state: React.SetStateAction<any[]>; current_user: React.SetStateAction<null>; }) => {
    setCellState(data.cell_state);
    setCurrentUser(data.current_user);
  }

  const isMyTurn = () => currentUser === ''; // ( ) should compare against getUserId() parent function

  const getMyCellState = () => getSessionCreatorUserId() === auth.dbContext.getMyUserId() ? State.X : State.O;

  const getOtherUser = () => getSessionUserIds().find(uid => uid !== auth.dbContext.getMyUserId());

  const playTurn = (i: number) => {
    let turnCellState = cellState.slice();
    turnCellState[i] = getMyCellState();
    let databaseState = { cell_state: turnCellState, current_user: getOtherUser() };
    getSessionDatabaseRef().set(databaseState, (error: object) => {
      error && console.error('Error updating TicTacToe state', error);
    });
  };

  const getWinner = () => {
    const isWinner = (x: string) => {
      const state = cellState;
      const isX = (cell: string)  => (cell === x);
      return state.slice(0, 3).every(isX) || // Row 1
          state.slice(3, 6).every(isX) || // Row 2
          state.slice(6, 9).every(isX) || // Row 3
          [state[0], state[3], state[6]].every(isX) || // Column 1
          [state[1], state[4], state[7]].every(isX) || // Column 2
          [state[2], state[5], state[8]].every(isX) || // Column 3
          [state[0], state[4], state[8]].every(isX) || // Diagonal
          [state[2], state[4], state[6]].every(isX); // Diagonal
    };
    if (isWinner(State.X)) {
      return State.X;
    } else if(isWinner(State.O)) {
      return State.O;
    } else {
      return null;
    }
  };

  let currentUserName = UserApi.getName(currentUser);
  let winnerState = getWinner();
  let headerText;
  if (winnerState !== null) {
    headerText = winnerState + " WINS!"
  } else if (cellState.every(cell => (cell !== State.EMPTY))) {
    headerText = "Draw! Game over.";
  } else if (isMyTurn()) {
    headerText = "It's YOUR turn, go!";
  } else {
    headerText = "It's " + currentUserName + "'s turn, wait...";
  }

  let allCellsDisabled = winnerState !== null || !isMyTurn();
  const cells = cellState.map((cell, i) => (
    <Button
        key={i}
        onPress={() => playTurn(i)}
        disabled={allCellsDisabled || cell !== State.EMPTY}>
      {cell}
    </Button>
  ));

  return (
    <View>
      <Text>{headerText}</Text>
      {cells.slice(0, 3)}
      <View style={{marginVertical: 4}} />
      {cells.slice(3, 6)}
      <View style={{marginVertical: 4}} />
      {cells.slice(6, 9)}
    </View>
  );
}

export default TicTacToe;