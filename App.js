let gameData = {
  width: 10,
  height: 10,
  mines: 7,
  boardId: '',
  minefield: [],
  reveal: false
}

function makeBoard(rows, cols) {
    var board = document.createElement("table");
    board.setAttribute("id", "board");
    let counter = 0;

    for (var i = 0; i < rows; i++) {
      var row = document.createElement("tr");
      board.appendChild(row);

      for (var j = 0; j < cols; j++) {
        var cell = document.createElement("td");
        cell.setAttribute("class", "");
        if (gameData.reveal === false) {
          var t = document.createTextNode(":)");
        } else {
          t = document.createTextNode(gameData.minefield[counter].count)
        }
        cell.appendChild(t);
        row.appendChild(cell);
        counter++;
      }
    }
  return board;
}

function fetchBoard() {
  let width = gameData.width;
  let height = gameData.height;
  let mines = gameData.mines;
  let url = `https://nameless-temple-96802.herokuapp.com/api/init?width=${width}&height=${height}&mines=${mines}`
  $.get(url, function(data) {
    gameData.boardId = data.board;
  }).then(function() {
    fetchBoardData()
  });

  $("#container").html(makeBoard(10, 10));
}

function fetchBoardData() {
  let boardId = gameData.boardId;
  let url = `https://nameless-temple-96802.herokuapp.com/api/reveal-all?board=${boardId}`;
  $.get(url, function(data) {
    gameData.minefield = data.data;
  });
}

function handleCellClick(x,y,index) {
  let count = gameData.minefield[index].count
  let clickedCell = document.getElementById('board').rows[x].cells[y]
  
  if (count === -1) {
    clickedCell.setAttribute("class", "bomb");
    clickedCell.innerHTML = "*";
    setTimeout(function(){ alert("GAME OVER!"); }, 100);
  } else {
    clickedCell.setAttribute("class", "safe");
    clickedCell.innerHTML = count;
  }
}

function toggleReveal() {
  gameData.reveal = !gameData.reveal;
  $("#container").html(makeBoard(10, 10));
}

$(document).ready(function() {
  fetchBoard();

  $("#new").click(function() {
    fetchBoard();
  });

  $("#reveal").click(function() {
    toggleReveal();
  });

  $("#hide").click(function() {
    toggleReveal();
  });

  $("td").click(function() {
    let x = this.parentNode.rowIndex;
    let y = this.cellIndex;

    var index = $("td").index(this);
    handleCellClick(x,y,index);
  });
  
});
