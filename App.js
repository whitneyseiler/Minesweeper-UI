function makeBoard(rows, cols) {
    // alert('clicked')
    var board = document.createElement("TABLE");
    board.setAttribute("id", "board");
    // document.getElementById('board-container').appendChild(board);

    for (var i = 0; i < rows; i++) {
      var row = document.createElement("TR");
      row.setAttribute("id", "row");
      board.appendChild(row);

      for (var j = 0; j < cols; j++) {
        var cell = document.createElement("TD");
        row.appendChild(cell);
      }
    }
  return board;
}

$('board-container').append(makeBoard(10, 10));

$('td').click(function() {
    var index = $('td').index( this );
});
