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
  var solution = new Board({"n":n}); //fixme
  //var solution = new Board([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  // solution.togglePiece(0,0);
  // solution.togglePiece(1,1);
  // solution.togglePiece(2,2);
  // solution.togglePiece(3,3);
  var rows = 0;
  var cols = 0;
  
  var innerFun = function(rows, cols) {
    console.log(rows);
    if (rows===n) return;
    
    solution.togglePiece(rows,cols);
    
    if (solution.hasAnyRooksConflicts()){
      solution.togglePiece(rows, cols);
      cols++;
      innerFun(rows, cols);
    } else {
      rows++;
      innerFun(rows, 0);
    }
  };
    
  innerFun(rows,cols);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
