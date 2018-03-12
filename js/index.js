
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

var allItems = [
    logo_01, logo_02, logo_03,
    logo_04, logo_05, logo_06
];

// The main timeline
var master;


btn.addEventListener('click', function() {
    createAnimation();
});

btnMaximise.addEventListener('click', function() {
    maximise();
});

// Animation variables
var timing = {
    in:1,
    out:1,
    betweenRows: '-=2',
    betweenLoop: 2
}


var startY = 150;
var endY = 50;


function createAnimation(){
	initAnim();
	// Create a master timeline
	// With a timeline for each row
	master = new TimelineMax({paused:true});
	master.add(rowAnim(1));
	master.add(rowAnim(2), timing.betweenRows);
	master.play();

}

function initAnim(){
	// Set logos at their correct x positions
	var elems = allItems;	
	TweenMax.set(elems[0], {x:100});
    TweenMax.set(elems[1], {x:300});
    TweenMax.set(elems[2], {x:500});
    TweenMax.set(elems[3], {x:100});
    TweenMax.set(elems[4], {x:300});
    TweenMax.set(elems[5], {x:500});
}

// Returns a timeline for one row
function rowAnim(num) {

    var tl = new TimelineMax({repeat:-1,repeatDelay:timing.betweenLoop});

    var marker;
    if (num === 1) {marker=0;}
    if (num === 2) {marker=3;}

    // Select next set of logos to animate
    var elems = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];

    // Set their position to start y position
    // tl.set(element, {left:100, opacity:0.5});

    // Tween in Row 1
    tl.add('animate-in');
    tl.fromTo(elems[0], timing.in ,{y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
    tl.fromTo(elems[1], timing.in, {y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
    tl.fromTo(elems[2], timing.in, {y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
   
    // // Tween out Row 1
    tl.add('animate-out');
    tl.to(elems[0], timing.out, {ease:"customOut",y:startY, opacity:0});
    tl.to(elems[1], timing.out, {ease:"customOut",y:startY, opacity:0});
    tl.to(elems[2], timing.out, {ease:"customOut",y:startY, opacity:0});

    return tl;
}


function minimise(){

}

// Pause and close down existing animation
// Shuffle up remaining rows
// Expand 'logo container' div
function maximise(){
	 master.pause();
}

// Each logo already has its x pos (that doesn't change over the course of this animation)
// Set each logo at its y position based on its position in the non-selected elements array
function itemsToGrid(){
    // Establish which logos are not currently selected
}


// Utils / helper functions
function randomise(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}