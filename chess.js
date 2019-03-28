function newBoard() {
  function emptyBoard() {
    let board = [];
    for (let i = 0; i < 128; i++) {
      if (i < 21 || i > 98) {
        board.push(7)
      } else if (i % 10 === 0) {
        board.push(7)
      } else if (i.toString().split('').pop() === '9') {
        board.push(7)
      } else {
        board.push(0)
      }
    }
    return board
  }

  let board = emptyBoard();
  //pawns
  for (let i = 31; i < 39; i++) {
    board[i] = 1;
    board[i + 50] = -1;
  }
  //knights
  board[22] = 2;
  board[27] = 2;
  board[92] = -2;
  board[97] = -2;
  //bishops
  board[23] = 3;
  board[26] = 3;
  board[93] = -3;
  board[96] = -3;
  //rooks
  board[21] = 4;
  board[28] = 4;
  board[91] = -4;
  board[98] = -4;
  //queens
  board[24] = 5;
  board[94] = -5;
  //kings
  board[25] = 6;
  board[95] = -6;

  return board;
}

function displayBoard(board) {
  for (let i = 11; i >= 0; i--) {
    let indexes = [];
    for (let j = 0; j < 10; j++) {
      if (i === 11 || i === 10) {
        indexes.push(parseInt(i.toString() + j.toString()))
      } else if (i === 0 ) {
        indexes.push(parseInt(j.toString()))
      } else {
        indexes.push(parseInt(i.toString() + j.toString()))
      }

    }
    let pieces = ''
    for (let e of indexes) {
      if (board[e].toString().length > 1) {
        pieces += board[e].toString()
      } else {
        pieces += ' ' + board[e].toString()
      }

    }
    console.log(pieces)
  }
}

function printIndexBoardReference() {
  for (let i = 11; i >= 0; i--) {
    let line = ''
    for (let j = 0; j < 10; j++) {
      if (i === 11 || i === 10) {
        line += i.toString() + j.toString() + ' '
      } else if (i === 0 ) {
        line += j.toString() + '   ';
      } else {
        line += i.toString() + j.toString() + '  ';
      }

    }
    console.log(line)
  }
}

function createCanEnPassantObj() {
  let table = {}
  let
}
class Game {
  constructor(){
    this.board = newBoard();
    this.fiftyMoveRule = 0;
    this.canCastle = { white: { king: true, queen: true}, black: { king: true, queen: true} };
    this.canEnPassant =
    this.boardHistory = [];
    this.turn = 'w';
  }
}

let game = new Game();
console.log(game.canCastle)










