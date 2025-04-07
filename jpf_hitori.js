"use strict";

//store an array of the td cells in the Hitori table
var allCells;

//runs function when page is loaded by the browser
window.onload = startUp;

/*displays the contents of Puzzle 1 after the page is loaded 
 and sets up the initial event handlers
*/
function startUp() {
    //display puzzle title and hitori puzzle
    document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
    document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);

    //loop through puzzle buttons change puzzle when clicked
    var puzzleButtons = document.getElementsByClassName("puzzles");
    for (var i = 0; i < puzzleButtons.length; i++) {
        puzzleButtons[i].onclick = switchPuzzle;//call function
    }
    //defines the initial appearance of the 1st puzzle
    setupPuzzle();

    //add event handlers to buttons to run functions when clicked
    document.getElementById("check").onclick = findErrors;
    document.getElementById("solve").onclick = showSolution;
}
//switches the page between the 3 possible Hitori puzzles
function switchPuzzle(e) {
    //confirm to verify upon switch
    if (confirm("You will lose all of your work on the puzzle! Continue?")) {
        var puzzleID = e.target.id;//target input id attribute
        //targets input value attribute
        document.getElementById("puzzleTitle").innerHTML = e.target.value;

        //choice to display which hitori puzzle after clicking input button selected by id
        switch (puzzleID) {
            case "puzzle1":
                document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
                break;
            case "puzzle2":
                document.getElementById("puzzle").innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
                break;
            case "puzzle3":
                document.getElementById("puzzle").innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
                break;
        }
            //sets up features of selected puzzle
            setupPuzzle();
    }
}

//Sets up a new puzzle, adding the event handlers for every puzzle cell.      
function setupPuzzle() {
    //create an object collection for every data cell in the table
    allCells = document.querySelectorAll("table#hitoriGrid td");

    //loop through each puzzle cell
    for (var i = 0; i < allCells.length; i++) {
        //table cells at default
        allCells[i].style.backgroundColor = "white";
        allCells[i].style.color = "black";
        allCells[i].style.borderRadius = "0";

       //when cell selected by mouse enter
       allCells[i].addEventListener("mousedown", function (e) {
           if (e.shiftKey) {//event for shift on keyboard
               e.target.style.backgroundColor = "white";
               e.target.style.color = "black";
               e.target.style.borderRadius = "0";
           }
           else if (e.altKey) {//event for alt on keyboard
               e.target.style.backgroundColor = "black";
               e.target.style.color = "white";
               e.target.style.borderRadius = "0";
           }
           else {//event for other keys
               e.target.style.backgroundColor = "rgb(101, 101, 101)";
               e.target.style.color = "white";
               e.target.style.borderRadius = "50%";
           }
            //avoid inadvertently selecting text of the table cells
            e.preventDefault();
        });

        //different mouse cursor depending on whether user does when hovered over a puzzle cell
        allCells[i].addEventListener("mouseover", function (e) {
            if (e.shiftKey) {//event for shift on keyboard
                e.target.style.cursor = "url(jpf_eraser.png), alias";
            }
            else if (e.altKey) {//event for alt on keyboard
                e.target.style.cursor = "url(jpf_block.png), cell";
            }
            else {//event for other keys
                e.target.style.cursor = "url(jpf_circle.png), pointer";
            }
        });
        //test whether the user has solve the puzzle
        allCells[i].addEventListener("mouseup", checkSolution);
    }
}//end of setupPuzzle function

//Highlights the errors in the Hitori puzzle in a red font for 5 secs
function findErrors() {
    //loop throug each cell to display red error
    for (var i = 0; i < allCells.length; i++) {
        if ((allCells[i].className === "blocks" && allCells[i].style.backgroundColor === "rgb(101,101,101)")
            ||
            (allCells[i].className === "circles" && allCells[i].style.backgroundColor === "black")) {
            allCells[i].style.color = "red";
        }
    }
    //times up after 5 seconds
    setTimeout(
        function () {
            //changing all cells with a font color of red back to white
            for (var i = 0; i < allCells.length; i++) {
                if (allCells[i].style.color === "red") {
                    allCells[i].style.color = "white";
                }
            }
        }, 5000);
}
/* ================================================================= */
//Checks the current user's puzzle to verify whether it contains the complete and correct solution.
function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */
   for (var i = 0; i < allCells.length; i++) {
      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not gray */
       if ((allCells[i].className == "blocks" && allCells[i].style.backgroundColor !== "black")
           ||
           (allCells[i].className == "circles" && allCells[i].style.backgroundColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
       }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}
//Shows the solution to the Hitori puzzle
function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}
/*
Returns a text string of the HTML code to
display a Hitori puzzle table based on the contents of
the numbers, blocks, and rating parameters.
*/
function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";

    //loop through each table row
    for (var i = 0; i < numbers.length; i++) {
      htmlString += "<tr>";
      //loop through 1st table row for # or ' ' from jpf_grids3.js file
      for (var j = 0; j < numbers[0].length; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }
      htmlString += "</tr>";
    }
   htmlString += "</table>";
   return htmlString;
}