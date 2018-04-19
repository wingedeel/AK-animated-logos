// Custom 'in' and 'out' animations
CustomEase.create("customIn", "M0,0 C0,0 0.136,0.462 0.172,0.902 0.182,0.99 0.234,1.048 0.312,1.044 0.363,1.041 0.394,0.978 0.468,0.978 0.524,0.978 0.58,1.01 0.638,1.012 0.726,1.012 0.766,1 0.904,1 0.964,1 1,1 1,1");
CustomEase.create("customOut", "M0,0 C0.344,-0.06 0.544,0.091 0.686,0.198 0.888,0.35 0.99,0.638 1,1");

// DOM elements
//---------------------------------//
const allItems = document.getElementsByClassName('logo');
let master;


// Animation variables
//---------------------------------//
const startY = 150;
const endY = 50;
const spacingX = 220;
const spacingY = 130;

const logosPerRow = 2;

const timing = {
    in:1,
    out:1,
    betweenRows: `-= ${logosPerRow-1}`,
    betweenLoop: 2
}
/*
TIMING
3 logos:
Each tween in is 1 second
Each tween out is 1 second
Whole animation takes 6 seconds
Next row comes in 2 seconds earlier

2 logos:
Each tween in is 1 second
Each tween out is 1 second
Whole animation takes 4 seconds
Next row comes in 2 seconds earlier

*/


// Main methods
//---------------------------------//
function createAnimation(){
	initAnim();
	// Create a master timeline with a timeline for each row
	master = new TimelineMax({paused:true});
	master.add(rowAnim(1));
    const rowCount = getRowCount();
    console.log('rowCount ', rowCount);
    for (let i=2; i<rowCount; i++){
         master.add(rowAnim(i), timing.betweenRows);
    }
    // master.add(rowAnim(2), timing.betweenRows);
    // master.add(rowAnim(3), timing.betweenRows);
	master.play();

}

function initAnim(){
	// Set logos at their correct x positions
    var xMarker = 0;	
    for (var i=0; i<allItems.length; i++){
        // Ascertain xPos of logo
        var xPos = (xMarker*spacingX);
        // Update marker
        if (xMarker+1 === logosPerRow) {
            xMarker=0;
        } else {
            xMarker++;
        }
        // Set logo at xpos
        TweenMax.set(allItems[i], {opacity:0, x:xPos, y: startY});
    }
}


function rowAnim(num) {
    // Returns a timeline for one row
    var tl = new TimelineMax({repeat:-1,repeatDelay:timing.betweenLoop*getRowCount()});

    // var marker;
    // if (num === 1) {marker=0;}
    // if (num === 2) {marker=3;} // If we're on row 2, get items starting at index 3
    // if (num === 3) {marker=6;}
    let marker = getRowStartIndex(num,logosPerRow);

    // Select next set of logos to animate
    // var elems = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];
    let elems = [];
    for (let k=0; k<logosPerRow; k++){
        elems.push(allItems[marker+k]);
    }

    tl.add('animate-in');
    for (let i=0; i<logosPerRow; i++) {
        tl.fromTo(elems[i], timing.in ,{y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
    }
   
    tl.add('animate-out');
    for (let j=0; j<logosPerRow; j++) {
       tl.to(elems[j], timing.out, {ease:"customOut",y:startY, opacity:0});
    }

    return tl;
}


function getRowCount() {
    return Math.floor(allItems.length/logosPerRow);
}

function getRowStartIndex(num, rowMax) {
    return Math.floor((num-1)*rowMax);
    // console.log('start ', start + ' ' + num + ' ' + rowMax)
}


// Maximise / minimise functionality
//---------------------------------//
// var btn = document.querySelector('#btn');
// var btnMaximise = document.querySelector('#btn-maximise');
// var btnMinimise = document.querySelector('#btn-minimise');

// btnMaximise.addEventListener('click', function() {
//     maximise();
// });

// btnMinimise.addEventListener('click', function() {
//     minimise();
// });


// // Pause and close down existing animation
// // Shuffle up remaining rows
// // Expand 'logo container' div
// function maximise(){
// 	 master.pause();
//      itemsToGrid();
// }

// function minimise(){
//     itemsToStart();
// }

// // Each logo has an assigned x,y position with the 'grid'
// // xpos always stays the same, assign a new y pos here
// // Move them from where they are to the destination position.
// function itemsToGrid() {
//     var elems = allItems;
//     var startPos = 100;
//     var markerX = 0;
//     var markerY = 0;
//     var posY = 0;
//     for (var i = 0; i < elems.length; i++) {

//         // Establish a y pos for this item
//         posY = startPos + (markerY * spacingY)

//         // When we have reached max num of logos per row
//         // Set x marker back to 0; increment y marker
//         if (markerX === (logosPerRow - 1)) {
//             markerX = 0;
//             markerY++;
//         } else {
//             // Otherwise, just increment x marker
//             markerX++;
//         }
//         // Set logo at xpos
//         TweenMax.to(elems[i], 0.6, { opacity:1, y: posY, ease: Power1.easeIn });
//     }
// }

// // Move logos back to their starting y positions
// function itemsToStart(){
//         TweenMax.staggerTo(allItems, 0.6, {opacity:0, y: startY, ease: Power1.easeIn, onComplete:restart});
// }

// function restart() {
//     master.play();
// }


// Init
//---------------------------------//
window.onload = function() {
  createAnimation();
};
