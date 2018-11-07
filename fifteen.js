(function() {

    window.addEventListener("load", load);
    //universal variables
    var y_and_x = 4;
    var horiz = 3;
    var vert = 3;
    var c = 0;

    function load() {
        makePuzzle();
    }
    // Extra feature Animation for tiles
    function tileAnimate(tile) {
        $(tile).fadeOut(250);
        $(tile).fadeIn(500);
    }

    function makePuzzle() { //Function to draw the puzzle area
        var puzzleArea = document.getElementById("puzzlearea");
        var tile = puzzleArea.children;
        $("#shufflebutton").click(shuffle);

        for (var y = 0; y < y_and_x; y++) {
            for (var x = 0; x < y_and_x; x++) {
                tile[c].classList.add("puzzlepiece");
                tile[c].setAttribute("id", "xy(" + x + "," + y + ")");				
                tile[c].style.left = 100 * x + "px";
                tile[c].style.top = 100 * y + "px";
                tile[c].onclick = CTM;
                tile[c].style.backgroundPosition = (0 - 100 * x) + "px" + " " + (0 - 100 * y) + "px"; 
				tile[c].onmouseover = highlight;
                tile[c].onmouseout = unhighlight;
                c++;
            }
        }
    }
	
	    function shuffler(tile) {
        var tempY = vert;
        var tempX = horiz;
        if (moveable(tile)) {
            horiz = parseInt(tile.style.left) / 100;
            vert = parseInt(tile.style.top) / 100;
            tile.style.left = (tempX * 100) + "px";
            tile.style.top = (tempY * 100) + "px";
            tile.setAttribute("id", "xy(" + tempX + "," + tempY + ")");
        }
    }

    function moveable(tile) {
        var area = getarea();
        if (area.indexOf(tile.getAttribute("id")) != -1) {
            return true;
        } else {
            return false;
        }
    }
    //To find coordinates of area tiles and help determining possible moves
    function getarea() {
        var up = "xy(" + horiz + "," + (vert - 1) + ")";
        var down = "xy(" + horiz + "," + (vert + 1) + ")";
        var right = "xy(" + (horiz - 1) + "," + vert + ")";
        var left = "xy(" + (horiz + 1) + "," + vert + ")";

        var area = [up, down, left, right];
        var mTile = [];

        for (var i = 0; i < area.length; i++) {
            if (document.getElementById(area[i]) != null) {
                mTile.push(area[i]);
            }
        }
        return mTile;
    }
    //Helper function to highlight movable piece
    function highlight() {
        if (moveable(this)) {
            this.classList.add("movablepiece");
        }
    }

    function unhighlight() {
        if (moveable(this)) {
            this.classList.remove("movablepiece");
        }

    }
    // Clicking will move tiles
    function CTM() {
        mTile(this);
    }

    function mTile(tile) {
        var tempY = vert;

        var tempX = horiz;

        if (moveable(tile)) {
            horiz = parseInt(tile.style.left) / 100;
            vert = parseInt(tile.style.top) / 100;
            tileAnimate(tile);
            tile.style.left = (tempX * 100) + "px";
            tile.style.top = (tempY * 100) + "px";
            tile.setAttribute("id", "xy(" + tempX + "," + tempY + ")");

        }

    }


	//Shuffle tile locations
    function shuffle() { 
        for (var i = 0; i < 1000; i++) {
            var area = getarea();
            var rand = parseInt(Math.random() * area.length);
            var tile = document.getElementById(area[rand]);
            shuffler(tile);
        }
    }

})();