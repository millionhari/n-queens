/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // a rook comes into conflict when another rook is in the same row or column
  // create a new board with 'n' amount of matricies (board = new Board({'n':n}));
  // get matrix of rows (board.rows())
  // rows[0][Math.floor(Math.random() * num)] = 1
  // iterate through rows
    // pass in rowIndex into hasRowConflictAt(i) or hasColConflictAt(i)
      // if value === false, current index = 1
  //
  var board = new Board({n:n});
  var solution = board.rows();
  for (var i = 0; i < solution.length; i++){
    for (var j = 0; j < solution[i].length; j++){
      solution[i][j] = 1;
      if (solution[i][j] === 1 && board.hasRowConflictAt(i) === true || board.hasColConflictAt(j) === true) {
        solution[i][j] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var board = new Board({n:n});
  // var solutionCount = 0;
  
  // function recurseNRooks(rowIndex){
  //   if (rowIndex === n){
  //     solutionCount++;
  //     return;
  //   }
  //   for (var i = 0 ; i < n ; i++){
  //     board.togglePiece(rowIndex, i);
  //     if (!board.hasColConflictAt(i) && !board.hasRowConflictAt(rowIndex)){
  //       recurseNRooks(rowIndex+1);
  //     }
  //     board.togglePiece(rowIndex, i);
  //   }
  // }
  // recurseNRooks(0);

  var solutionCount = 1;
  for (var i = 1; i <= n; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = new Board({n:n});

  function recurse(rowIndex){
    if (rowIndex === n){
      return;
    }

    for (var i = 0 ; i < n ; i++){
      solution.togglePiece(rowIndex, i);
      if (solution.hasAnyQueenConflictsOn(rowIndex, i)){
        solution.togglePiece(rowIndex, i);
      }
    }
      recurse(rowIndex+1);
  }

  recurse(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //togglePiece
  //hasAnyQueenConflictsOn(rowIndex, i)
  var board = new Board({n:n});
  var solutionCount = 0;

  function recurseNQueens(rowIndex){
    if (rowIndex === n){
      solutionCount++;
      return;
    }
    for (var i = 0 ; i < n ; i++){
      board.togglePiece(rowIndex, i);
      if (!board.hasAnyQueenConflictsOn(rowIndex, i)){
        recurseNQueens(rowIndex+1);
      }
      board.togglePiece(rowIndex, i);
    }
  }

  recurseNQueens(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
