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
    this.boardHistory = [];
    this.turn = 'w';
    this.canCastle = { white: { king: true, queen: true}, black: { king: true, queen: true} };
    this.enPassantSquares = [];
    this.halfMoveClock = 0;
  }

  move(square, destination){
    let pieceType = this.pieceAt(square);

    if (!this.pieceBelongsToPlayer(pieceType)) {
      throw "invalid move, piece doesn't belong to current player";
    }

    if (this.inCheck(this.turn)) {
      //move must get out of check -> compare new position with old position
    }

    if (this.validMove(square, pieceType, destination)) {
      //must fix to work for en passant (the captured pawn needs to be deleted on
      //a different square from where the capturing pawn goes)
      this.board[destination] = this.board[square];
      this.board[square] = 0;
    } else {
      throw "invalid move, piece cannot move to requested square";
    }
  }

  pieceAt(square){
    return this.board[square];
  }

  pieceBelongsToPlayer(pieceType) {
    if (this.turn === 'w' && pieceType > 0) return true;
    if (this.turn === 'b' && pieceType < 0) return true;
    return false;
  }



  validMove(square, pieceType, destination) {
    if (pieceType === 1 || pieceType === -1) {
      return this.validPawnMove(square, pieceType, destination);
    } else if (pieceType === 2 || pieceType === -2) {
      return this.validKnightMove(square, pieceType, destination);
    } else if (pieceType === 3 || pieceType === -3) {
      return this.validBishopMove(square, pieceType, destination);
    } else if (pieceType === 4 || pieceType === -4) {
      return this.validRookMove(square, pieceType, destination);
    } else if (pieceType === 5 || pieceType === -5) {
      return this.validQueenMove(square, pieceType, destination);
    } else if (pieceType === 6 || pieceType === -6) {
      return this.validKingMove(square, pieceType, destination);
    } else {
      return false;
    }
  }

  validPawnMove(square, pieceType, destination) {
    //check if can move 1 or two squares
    //check if can en passant
  }
  validKnightMove(square, pieceType, destination) {}
  validBishopMove(square, pieceType, destination) {}
  validRookMove(square, pieceType, destination) {}
  validQueenMove(square, pieceType, destination) {}
  validKingMove(square, pieceType, destination) {
    //check castle & normal moves
  }

  inCheck() {}
  isCheckmate(){}
}

let game = new Game();


// Display Functions
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






