// TO DO NEXT:
// On maximise, all items to go to their designated grid position


// Create custom 'in' and 'out' animations
CustomEase.create("customIn", "M0,0 C0,0 0.136,0.462 0.172,0.902 0.182,0.99 0.234,1.048 0.312,1.044 0.363,1.041 0.394,0.978 0.468,0.978 0.524,0.978 0.58,1.01 0.638,1.012 0.726,1.012 0.766,1 0.904,1 0.964,1 1,1 1,1");
CustomEase.create("customOut", "M0,0 C0.344,-0.06 0.544,0.091 0.686,0.198 0.888,0.35 0.99,0.638 1,1");

// Get refs to elements
var btn = document.querySelector('#btn');
var btnMaximise = document.querySelector('#btn-maximise');

var logo_01 = document.querySelector('#logo-01');
var logo_02 = document.querySelector('#logo-02');
var logo_03 = document.querySelector('#logo-03');
var logo_04 = document.querySelector('#logo-04');
var logo_05 = document.querySelector('#logo-05');
var logo_06 = document.querySelector('#logo-06');
var logo_07 = document.querySelector('#logo-07');
var logo_08 = document.querySelector('#logo-08');
var logo_09 = document.querySelector('#logo-09');

var allItems = [
    logo_01, logo_02, logo_03,
    logo_04, logo_05, logo_06,
    logo_07, logo_08, logo_09
];

// The main timeline
var master;


btn.addEventListener('click', function() {
    createAnimation();
});

btnMaximise.addEventListener('click', function() {
    maximise();
});

// ------------------ //
// Animation variables
// ------------------ //
var timing = {
    in:1,
    out:1,
    betweenRows: '-=2',
    betweenLoop: 2
}

var startY = 150;
var endY = 50;
var logoSpacing = 220;
var logosPerRow = 3;
// ------------------ //
// ------------------ //


function createAnimation(){
	initAnim();
	// Create a master timeline
	// With a timeline for each row
	master = new TimelineMax({paused:true});
	master.add(rowAnim(1));
    master.add(rowAnim(2), timing.betweenRows);
    master.add(rowAnim(3), timing.betweenRows);
	master.play();

}

function initAnim(){
	// Set logos at their correct x positions
	var elems = allItems;
    var xMarker = 0;	
    for (var i=0; i<elems.length; i++){
        // Ascertain xPos of logo
        var xPos = (xMarker*logoSpacing);
        // Update marker
        if (xMarker+1 === logosPerRow) {
            xMarker=0;
        } else {
            xMarker++;
        }
        // Set logo at xpos
        TweenMax.set(elems[i], {x:xPos});
    }
}

// Returns a timeline for one row
function rowAnim(num) {

    var tl = new TimelineMax({repeat:-1,repeatDelay:timing.betweenLoop*3});
    // Wait 12 seconds before playing again
    // (each anim takes 6 secs and there are 2 row animations to wait for)
    // var tl = new TimelineMax({repeat:-1,repeatDelay:12});

    var marker;
    if (num === 1) {marker=0;}
    if (num === 2) {marker=3;}
    if (num === 3) {marker=6;}

    // Select next set of logos to animate
    var elems = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];

    // Set their position to start y position
    // tl.set(element, {left:100, opacity:0.5});

    // Tween in Row 1
    tl.add('animate-in');
    tl.fromTo(elems[0], timing.in ,{y:startY, opacity:0.5},{ease:"customIn",y:endY, opacity:1});
    tl.fromTo(elems[1], timing.in, {y:startY, opacity:0.5},{ease:"customIn",y:endY, opacity:1});
    tl.fromTo(elems[2], timing.in, {y:startY, opacity:0.5},{ease:"customIn",y:endY, opacity:1});
   
    // // Tween out Row 1
    tl.add('animate-out');
    tl.to(elems[0], timing.out, {ease:"customOut",y:startY, opacity:0.5});
    tl.to(elems[1], timing.out, {ease:"customOut",y:startY, opacity:0.5});
    tl.to(elems[2], timing.out, {ease:"customOut",y:startY, opacity:0.5});

    return tl;
}


function minimise(){

}

// Pause and close down existing animation
// Shuffle up remaining rows
// Expand 'logo container' div
function maximise(){
	 master.pause();
     itemsToGrid();
}

// Each logo has an assigned x,y position with the 'grid'
// xpos always stays the same, assign a new y pos here
// Move them from where they are to the destination position.
function itemsToGrid() {
    var elems = allItems;
    var startPos = 100;
    var spacingY = 200;
    var markerX = 0;
    var markerY = 0;
    var posY = 0;
    for (var i = 0; i < elems.length; i++) {

        // Establish a y pos for this item
        posY = startPos + (markerY * spacingY)

        // When we have reached max num of logos per row
        // Set x marker back to 0;
        // Increment y marker
        if (markerX === (logosPerRow - 1)) {
            markerX = 0;
            markerY++;
        } else {
            // Otherwise, just increment x marker
            markerX++;
        }
        // Set logo at xpos
        TweenMax.to(elems[i], 0.4, { y: posY, ease: "customOut" });
    }
}



function itemsToFixedGrid () {

}

// // Utils / helper functions
// function randomise(array) {
//     var currentIndex = array.length,
//         temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {

//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }