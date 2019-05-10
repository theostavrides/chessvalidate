
function newBoard() {
  function emptyBoard() {
    let board = [];
    for (let i = 0; i < 120; i++) {
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
    const piece = this.pieceAt(square);

    if (!this.squareOnBoard(square) || !this.squareOnBoard(destination)) {
      throw new Error(`Home square or destination square doesn't exist`);
    }

    if (!this.pieceBelongsToPlayer(piece)) {
      throw new Error(`Piece doesn't belong to current player`);
    }

    if (!this.validDestination(destination)) {
      throw new Error(`Destination square occupied by current player`)
    }

    if (this.inCheck(this.turn)) {
    }

    if (!this.validMove(square, piece, destination)) {
      throw new Error("Invalid move: piece cannot move to destination square");
    }

    this.board[square] = 0;
    this.board[destination] = piece;
    this.history.push(this.board);
    this.endTurn();
    return this.board;
  }

  squareOnBoard(square){
    if (square < 20 || square > 98) return false;
    if (square.toString().slice(-1) == 0 || square.toString().slice(-1) == 9 ) return false;
    return true;
  }

  validDestination(destination){
    if (this.pieceBelongsToPlayer(this.board[destination])) return false;
    return true;
  }

  endTurn(){
    this.turn === 'w' ? this.turn = 'b' : this.turn ='w';
  }

  pieceAt(square){
    return this.board[square];
  }

  pieceBelongsToPlayer(piece) {
    if (this.turn === 'w' && piece > 0 && piece !== 7) return true;
    if (this.turn === 'b' && piece < 0) return true;
    return false;
  }

  validMove(square, piece, destination) {
    if (Math.abs(piece) === 1) {
      return this.validPawnMove(square, piece, destination);
    } else if (Math.abs(piece) === 2) {
      return this.validKnightMove(square, piece, destination);
    } else if (Math.abs(piece) === 3) {
      return this.validBishopMove(square, piece, destination);
    } else if (Math.abs(piece) === 4) {
      return this.validRookMove(square, piece, destination);
    } else if (Math.abs(piece) === 5) {
      return this.validQueenMove(square, piece, destination);
    } else if (Math.abs(piece) === 6) {
      return this.validKingMove(square, piece, destination);
    } else {
      return false;
    }
  }

  validPawnMove(square, piece, destination) {
    return true;
  }
  validKnightMove(square, piece, destination) {
    const legalMoves = [8, 12 ,19 ,21];
    if (!legalMoves.includes(Math.abs(square - destination))) return false;
    return true;
  }
  validBishopMove(square, piece, destination) {
    const legalMoves = [9, 18, 27, 36, 45, 54, 63, 11, 22, 33, 44, 55, 66, 77];
    if (!legalMoves.includes(Math.abs(square - destination))) return false
    return true;
  }
  validRookMove(square, piece, destination) {
    let onSameRank;
    let onSameFile;
    if (square.toString()[0] === destination.toString()[0]) onSameRank = true;
    if (square.toString()[1] === destination.toString()[1]) onSameFile = true;
    if (!(onSameFile || onSameRank)) return false;
    return true;
  }
  validQueenMove(square, piece, destination) {
    if ( !(this.validRookMove(square, piece, destination) || this.validBishopMove(square, piece, destination)) ) return false;
    return true;
  }
  validKingMove(square, piece, destination) {
    const legalMoves = [1, 9, 10, 11];
    if (!legalMoves.includes(Math.abs(square - destination))) return false;
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
// displayBoard(game.move(27,27+19))
// displayBoard(game.move(92,92-19))
// displayBoard(game.move(46,65))
// displayBoard(game.move(73,65))

displayBoard(game.move(35,55))
displayBoard(game.move(85,65))
displayBoard(game.move(25,35))
displayBoard(game.move(95,85))
displayBoard(game.move(35,46))
displayBoard(game.move(85,76)) //black
displayBoard(game.move(26,53))
displayBoard(game.move(94,85))
displayBoard(game.move(24,35))
displayBoard(game.move(85,52))
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
  console.log('\n')
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