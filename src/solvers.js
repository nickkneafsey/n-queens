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
  var lastCol;

  // var innerFun = function(rows, cols) {
  //   if (rows===n) return;
    
  //   solution.togglePiece(rows,cols);
    
  //   if (solution.hasAnyRooksConflicts()){
  //     solution.togglePiece(rows, cols);
  //     cols++;
  //     innerFun(rows, cols);
  //   } else {
  //     rows++;
  //     innerFun(rows, 0);
  //   }
  // };
  
  var innerFun = function(rows, cols) {
    if (rows === n) return;
    
    solution.togglePiece(rows,cols);
    
    if (solution.hasAnyRooksConflicts()){
      solution.togglePiece(rows, cols);
      cols++;
      if (cols === n){
        cols = lastCol + 1;
        rows --;
        solution.clearRows(rows);
      }
      innerFun(rows, cols);

    } else {
      rows++;
      lastCol=cols;
      innerFun(rows, 0);
    }
  };

  innerFun(rows,cols);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //var solution = undefined; //fixme
  var solutionCount = 1;
  for (var i = 1; i <= n; i++){
    solutionCount*=i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.tester = function(n){
  var array = arrayMaker(n);
  var outcomes = [];
  var count = 0;

  var findOutcome = function(roundsLeft, playsSoFar){
    if (roundsLeft === 0) return outcomes.push(playsSoFar);
    roundsLeft --;
    for (var i = 0; i<array.length; i++){
      
      findOutcome(roundsLeft, playsSoFar.concat([array[i]]));
    }
  }
  findOutcome(n, [])
  return  outcomes;
  
};

window.arrayMaker = function(n){
  var array = [];
  for (var i = 0; i<n; i++){
    var ary = []
    for (var j = 0; j<n; j++){
      if (i===j) ary.push(1);
      else ary.push(0);
    }
    array.push(ary);
  }
  return array;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({"n":n}); //fixme
  

  var array = tester(n);
  console.log(array);

  for (var i = 0; i<array.length; i++){
    var sol = new Board(array[i]);
    if (!sol.hasAnyQueensConflicts()) {
      return sol.rows();
    }
  }

  // var rows = 0;
  // var cols = 0;
  // var lastCol;

  // var innerFun = function(rows, cols) {
  //   if (rows === n) return;
    
  //   solution.togglePiece(rows,cols);
    
  //   if (solution.hasAnyQueensConflicts()){
  //     solution.togglePiece(rows, cols);
  //     cols++;
  //     if (cols === n){
  //       cols = lastCol + 1;
  //       rows--;
  //       solution.clearRow(rows);
  //     }
  //     //console.log(solution.rows());
  //     innerFun(rows, cols);

  //   } else {
  //     rows++;
  //     lastCol=cols;
  //     innerFun(rows, 0);
  //   }
  // };
  // innerFun(rows,cols);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined;
  var solutionCount = 0;
  //var 

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
