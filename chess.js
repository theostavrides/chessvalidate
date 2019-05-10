
function newBoard() {
  function emptyBoard() {
    let board = [];
    for (let i = 0; i < 128; i++) {
      if (i < 21 || i > 98) {
        board.push(7);
      } else if (i % 10 === 0) {
        board.push(7);
      } else if (i.toString().split('').pop() === '9') {
        board.push(7);
      } else {
        board.push(0);
      }
    }
    return board;
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

class Game {
  constructor(){
    this.board = newBoard();
    this.history = [];
    this.turn = 'w';
    this.canCastle = { white: { king: true, queen: true}, black: { king: true, queen: true} };
    this.enPassantSquares = [];
    this.moves = 0;
  }

  move(square, destination){
    const pieceType = this.pieceAt(square);

    if (!this.pieceBelongsToPlayer(pieceType)) {
      throw new Error(`Invalid move: piece doesn't belong to current player`);
    }

    if (!this.validDestination(destination)) {
      throw new Error(`Invalid move: destination square occupied by current player or off board`)
    }

    if (this.inCheck(this.turn)) {
    }

    if (!this.validMove(square, pieceType, destination)) {
      throw new Error("Invalid move: piece cannot move to destination square");
    }

    this.board[square] = 0;
    this.board[destination] = pieceType;
    this.endTurn();
    this.history.push(this.board)
    return this.board;
  }

  validDestination(destination){
    console.log('a')
    if (this.pieceBelongsToPlayer(this.board[destination])) return false;
    console.log('b')
    if (this.board[destination] === 7) return false
    return true;
  }

  endTurn(){
    this.turn === 'w' ? this.turn = 'b' : this.turn ='w';
  }

  pieceAt(square){
    return this.board[square];
  }

  pieceBelongsToPlayer(pieceType) {
    if (this.turn === 'w' && pieceType > 0 && pieceType !== 7) return true;
    if (this.turn === 'b' && pieceType < 0) return true;
    return false;
  }

  validMove(square, pieceType, destination) {
    if (Math.abs(pieceType) === 1) {
      return this.validPawnMove(square, pieceType, destination);
    } else if (Math.abs(pieceType) === 2) {
      return this.validKnightMove(square, pieceType, destination);
    } else if (Math.abs(pieceType) === 3) {
      return this.validBishopMove(square, pieceType, destination);
    } else if (Math.abs(pieceType) === 4) {
      return this.validRookMove(square, pieceType, destination);
    } else if (Math.abs(pieceType) === 5) {
      return this.validQueenMove(square, pieceType, destination);
    } else if (Math.abs(pieceType) === 6) {
      return this.validKingMove(square, pieceType, destination);
    } else {
      return false;
    }
  }

  validPawnMove(square, pieceType, destination) {
    return true;
  }
  validKnightMove(square, pieceType, destination) {
    const legalMoves = [8,12,19,21];
    console.log(square, destination)
    if (!legalMoves.includes(Math.abs(square - destination))) return false;
    return true;
  }
  validBishopMove(square, pieceType, destination) {
    return true;
  }
  validRookMove(square, pieceType, destination) {
    return true;
  }
  validQueenMove(square, pieceType, destination) {
    return true;
  }
  validKingMove(square, pieceType, destination) {
    return true;
  }

  inCheck() {}
  isCheckmate(){}
}

let game = new Game();

//pawn moves
// displayBoard(game.move(31,41))
// displayBoard(game.move(81,71))

//test knight moves
displayBoard(game.move(27,27+19))
displayBoard(game.move(92,92-19))
displayBoard(game.move(46,65))
displayBoard(game.move(73,65))



/******* Display Functions ******/

function displayBoard(board) {
  for (let i = 11; i >= 0; i--) {
    let indexes = [];
    for (let j = 0; j < 10; j++) {
      if (i === 11 || i === 10) {
        indexes.push(parseInt(i.toString() + j.toString()));
      } else if (i === 0 ) {
        indexes.push(parseInt(j.toString()));
      } else {
        indexes.push(parseInt(i.toString() + j.toString()));
      }

    }
    let pieces = '';
    for (let e of indexes) {
      if (board[e].toString().length > 1) {
        pieces += board[e].toString();
      } else {
        pieces += ' ' + board[e].toString();
      }

    }
    console.log(pieces);
  }
}

function printIndexBoardReference() {
  for (let i = 11; i >= 0; i--) {
    let line = '';
    for (let j = 0; j < 10; j++) {
      if (i === 11 || i === 10) {
        line += i.toString() + j.toString() + ' ';
      } else if (i === 0 ) {
        line += j.toString() + '   ';
      } else {
        line += i.toString() + j.toString() + '  ';
      }
    }
    console.log(line);
  }
}