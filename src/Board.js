// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if A SPECIFIC row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // make counter
      // iterate through row
      // increment counter if values at index in row does not equal to zero
      // if counter > 1, return true; else, retur n false
      var counter = 0;
      var n = this.get(rowIndex);
      // console.log(n);
      for (var i = 0; i < n.length; i++) {
        if (n[i] === 1) {
          counter+= n[i];
        }
      }
      return (counter > 1);
    },

    // test if ANY rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // make counter
      // iterate through all rows
      // use hasRowConflictAt by passing in the current row to hasRowConflict
      var counter = 0;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++){
        if(this.hasRowConflictAt(i)){
          counter++;
        }
      }
      return (counter > 0);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // make counter
      // iterate through all rows
      var counter = 0;
      var rows = this.rows();

      for (var i = 0; i < rows.length; i++) {
        if(rows[i][colIndex]) {
          counter++;
        }
      }
      return (counter > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // make counter
      // iterate through all rows
      // use hasRowConflictAt by passing in the current row to hasRowConflict
      var counter = 0;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++){
        if(this.hasColConflictAt(i)){
          counter++;
        }
      }
      return (counter > 0);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // make counter
      // get all rows
      // iterate through the rows
        // add rows[i][majorDiagonalColumnIndexAtFirstRow] to counter
        // increment MDCIAFR
      // if counter > 1, return true
      // else, return false
      var rows = this.rows();
      var counter = 0;
      var start = majorDiagonalColumnIndexAtFirstRow;

      for (var i = 0; i < rows.length; i++) {
        if (rows[i][start] !== undefined) {
          counter += rows[i][start];
        }
        start++;
      }

      return (counter > 1);

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var result = false;

      for (var i = 0; i < rows.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          result = true;
        }
      }

      return result;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var start = minorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++){
        if (rows[i][start] !== undefined){
          counter+= rows[i][start];
        }
        start--;
      }
      return (counter > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var result = false;

      for (var i = 0; i < rows.length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          result = true;
        }
      }

      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
