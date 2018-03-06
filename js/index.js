/* TO DO
- Initialisation:
- Arrange grid of logos

- On button click:
- Look at marker index and select next 3. Do their intro anim
- If 3 logos have already been selected, do their outro anim

(I think both these animations can happen at the same time
rather than one after the other?)

logo1 up, logo2up, logo3up
logo1 down, logo2down, logo3down

- 
*/
// Animation variables


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

var master;


// All logo elements
var selectedItems = []; // 3 currently selected logo elements
var marker = 0; // Index selection is at

btn.addEventListener('click', function() {
     // createTimeline();
    // simpleTest1();
    // simpleTest2();
    simpleTest3();
});

btnMaximise.addEventListener('click', function() {
     // createTimeline();
    // simpleTest1();
    // simpleTest2();
    maximise();
});


var config = {
    durationInEach:1,
    durationInBetween: 0.5,
    durationOutEach:0.5,
    durationOutBetween: 0.5,
}

var startY = 150;
var endY = 50;


function createTimeline(){
    
    
    marker=0;
    var elements;
    var elementsExit;
    var tl = new TimelineMax({paused:true});
    do {

        // Select next set of logos to animate
        elements = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];

        // Position logos in start pos
        for (var i = 0; i < 3; i++) {
            tl.set(elements[i], { x: (200 * i) + 200, y: startY, opacity: 0 })
        }
        // Animate in 3 logos
        tl.staggerTo(elements, config.durationInEach, {
            y: endY,
            opacity: 1,
            ease: "customIn"
        }, config.durationInBetween);
        selectedItems = elements;
         marker = marker+3;
        // Animate out 3 logos (slightly before the previous stagger completes)
        elementsExit = selectedItems.slice(0);
        tl.staggerTo(elementsExit, config.durationOutEach, {
            y: startY,
            opacity: 0,
            ease: "customOut",
            cycle: { delay: function(index) {
                return '-=2';
            }}
        }, config.durationOutBetween);

        

    } while ((marker + 3) < allItems.length);


    tl.play();
}

function simpleTest1 () {

    var tl = new TimelineMax({paused:true});

    marker=0;
    var elements;

    // Select next set of logos to animate
    elements = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];
   
    // Get Row 1 in starting pos
    tl.set(allItems[0], {x:200, y:startY, opacity:0});
    tl.set(allItems[1], {x:400, y:startY, opacity:0});
    tl.set(allItems[2], {x:600, y:startY, opacity:0});

    // Tween in Row 1
    tl.to(allItems[0], 1, {ease:Power2.easeIn,y:endY, opacity:1});
    tl.to(allItems[1], 1, {ease:Power2.easeIn,y:endY, opacity:1});
    tl.to(allItems[2], 1, {ease:Power2.easeIn,y:endY, opacity:1});

    // Get Row 2 in starting pos
    // tl.add(TweenMax.set(allItems[3], {x:200, y:startY, opacity:0}));
    // tl.add(TweenMax.set(allItems[4], {x:400, y:startY, opacity:0}));
    // tl.add(TweenMax.set(allItems[5], {x:600, y:startY, opacity:0}));

    // // Tween in Row 2
    // tl.to(allItems[3], 1, {ease:Power2.easeIn,y:endY, opacity:1});
    // tl.to(allItems[4], 1, {ease:Power2.easeIn,y:endY, opacity:1});
    // tl.to(allItems[5], 1, {ease:Power2.easeIn,y:endY, opacity:1});

    // // Tween out Row 1
    tl.to(allItems[0], 2, {ease:Power2.easeOut,y:startY, opacity:0.5});
    tl.to(allItems[1], 2, {ease:Power2.easeOut,y:startY, opacity:0.5});
    tl.to(allItems[2], 2, {ease:Power2.easeOut,y:startY, opacity:0.5});

    // TweenMax.set(allItems[3], {x:200, y:startY, opacity:0.5});

     
    // tl.to(allItems[0], 2, {ease:Power2.easeOut, y:startY, opacity:0.5});
    // tl.to(allItems[3], 2, {ease:Power2.easeIn,y:endY, opacity:1});
    // tl.to(allItems[0], 2, {ease:Power2.easeIn,y:endY, opacity:1}, "-=1");
    // tl.to(allItems[3], 2, {ease:Power2.easeOut,y:startY, opacity:0.5});

    tl.play();
}

function simpleTest2(){
	TweenMax.set(allItems[0], {x:200, y:startY, opacity:0});
    TweenMax.set(allItems[1], {x:400, y:startY, opacity:0});
    TweenMax.set(allItems[2], {x:600, y:startY, opacity:0});

    // Tween in Row 1
    TweenMax.to(allItems[0], 1, {ease:Power2.easeIn,y:endY, opacity:1});
    TweenMax.to(allItems[1], 1, {ease:Power2.easeIn,y:endY, opacity:1});
    TweenMax.to(allItems[2], 1, {ease:Power2.easeIn,y:endY, opacity:1});
}

function simpleTest3(){
	init();
	// Create a master timeline
	// With a timeline for each row
	master = new TimelineMax({paused:true});
	master.add(TL_row(1));
	master.add(TL_row(2), '-=2');
	master.play();

}

function init(){
	// Set logos at their correct y positions
	var elems = allItems;	
	TweenMax.set(elems[0], {x:100, y:startY});
    TweenMax.set(elems[1], {x:300, y:startY});
    TweenMax.set(elems[2], {x:500, y:startY});
    TweenMax.set(elems[3], {x:100, y:startY});
    TweenMax.set(elems[4], {x:300, y:startY});
    TweenMax.set(elems[5], {x:500, y:startY});
}

// Returns a timeline for one row
function TL_row(num) {

    var tl = new TimelineMax({repeat:-1,repeatDelay:2});

    var marker;
    if (num === 1) {marker=0;}
    if (num === 2) {marker=3;}

    // Select next set of logos to animate
    var elems = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];

    // Tween in Row 1
    tl.add('animate-in');
    tl.fromTo(elems[0], 1,{y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
    tl.fromTo(elems[1], 1, {y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
    tl.fromTo(elems[2], 1, {y:startY, opacity:0},{ease:"customIn",y:endY, opacity:1});
   
    // // Tween out Row 1
    tl.add('animate-out');
    tl.to(elems[0], 1, {ease:"customOut",y:startY, opacity:0});
    tl.to(elems[1], 1, {ease:"customOut",y:startY, opacity:0});
    tl.to(elems[2], 1, {ease:"customOut",y:startY, opacity:0});

    return tl;
}


function maximise(){
	 master.pause();
}


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