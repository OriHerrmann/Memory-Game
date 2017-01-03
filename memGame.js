/**
 * Created by itc_user1 on 12/28/2016.
 */
var ori = {}

var memory_array = ['1','1','2','2','3','3','4','4','5','5','6','6'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for(var i = 0; i < memory_array.length; i++){
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = '#89FEB0';
        tile.innerHTML = val;
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]){
                tiles_flipped += 2;

                // Clear arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check if board is cleared
                if(tiles_flipped == memory_array.length){
                    alert("You Win!!! Generating New Game.");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flipBack(){
                    // flip over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(./images/q4.jpg) center';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(./images/q4.jpg) center';
                    tile_2.innerHTML = "";

                    // clear arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                // time delay
                setTimeout(flipBack, 500);
            }
        }
    }
}