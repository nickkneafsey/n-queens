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

window.getSolution = function(board, rows, validator, n){
  if (rows === n){
    return board;
  }
  for (var i = 0; i<n; i++){
    board.togglePiece(rows, i);
    if (!board[validator]()){
      var result = getSolution(board, rows + 1, validator, n);
    }
    if (result) return result;
    board.togglePiece(rows,i);
  }
};

window.findNRooksSolution = function(n) {
  var solution = new Board({"n":n}); //fixme
 
  getSolution(solution, 0, "hasAnyRooksConflicts", n );
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var array = combos(n);
  console.log('Number of solutions for ' + n + ' rooks:', array.length);
  return array.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({"n":n});

  getSolution(solution, 0, "hasAnyQueensConflicts", n);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //var solution = undefined;
  var solutionCount = 0;
  var array = combos(n);
  for (var i = 0; i<array.length; i++){
    if (diagonallyValid(array[i])){
      solutionCount++;
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.betterArrayMaker = function(n){
  var array = [];
  for (var i = 0; i<n; i++){
    array.push(i);
  }
  return array;
};

window.combos = function(n){
  var array = betterArrayMaker(n)
  var permArr = [],
  usedChars = [];

  var permute = function(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
  };
  return permute(array)
};

window.diagonallyValid = function(array){
  var addArray = [];
  var subtractArray = [];
  for (var i = 0; i<array.length; i++){
    addArray.push(array[i] + i);
  }
  for (var i = 0; i<array.length; i++){
    subtractArray.push(array[i] - i);
  }
  var uniqueAdd = _.uniq(addArray);
  var uniqueSub = _.uniq(subtractArray);

  return uniqueAdd.length === array.length && uniqueSub.length === array.length;
};