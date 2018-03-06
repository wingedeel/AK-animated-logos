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

CustomEase.create("customAnim", "M0,0.005 C0,0.005 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0");

var btnBounceUp = document.querySelector('#btn-bounce-up');

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

var initY = 100;
var displayY = 0;

// All logo elements
var selectedItems = []; // 3 currently selected logo elements
var marker = 0; // Index selection is at

var tl = new TimelineLite();


btnBounceUp.addEventListener('click', function() {
    // If there are any existing displayed logos remove them
    // if (selectedItems.length > 0) {
    //     bounceOut();
    //     bounceIn();
    // } else {
    //     bounceIn();
    // }
    createTimeline();
});

function bounceInComplete() {
    console.log('bounceIn complete');

}

function bounceOutComplete() {
    console.log('bounceOut complete');
}

function createTimeline(){
	
	// Select next set of logos to animate
	marker=0;
	var elements;
	var elementsExit;
	elements = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];
	// Position logos in start pos
	for (var i = 0; i < 3; i++) {
        TweenMax.set(elements[i], { x: (200 * i) + 200, y: initY, opacity: 0 })
    }
	// Animate in 3 logos
	tl.staggerTo(elements, 1.5, {
		y: displayY,
        opacity: 1,
        ease: Elastic.easeOut
    }, 0.5);
    selectedItems = elements;

	// Animate out logos 1-3
	elementsExit = selectedItems.slice(0);
    tl.staggerTo(elementsExit, 1.5, {
        y: initY,
        opacity: 0,
        ease: Power3.easeOut
    }, 0.5);

    // Select next set of logos to animate
	marker=3;
	elements = [allItems[marker], allItems[marker + 1], allItems[marker + 2]];
	// Position logos in start pos
	for (var i = 0; i < 3; i++) {
        TweenMax.set(elements[i], { x: (200 * i) + 200, y: initY, opacity: 0 })
    }

    // Animate in 3 logos
	tl.staggerTo(elements, 1.5, {
		y: displayY,
        opacity: 1,
        ease: Elastic.easeOut
    }, 0.5, "-=3");
    selectedItems = elements;

    tl.play();
}


function bounceIn() {
    // Select next 3 logos to move, and store a ref to them
    selectedItems = randomise([allItems[marker], allItems[marker + 1], allItems[marker + 2]]);
    for (var i = 0; i < 3; i++) {
        TweenMax.set(selectedItems[i], { x: (200 * i) + 200, y: initY, opacity: 0 })
    }

    TweenMax.staggerTo(selectedItems, 1.5, {
        y: displayY,
        opacity: 1,
        ease: Elastic.easeOut
    }, 0.4, bounceInComplete);
    updateMarker();
}

function bounceOut() {
    var animItems = selectedItems.slice(0);
    TweenMax.staggerTo(animItems, 0.6, {
        y: initY,
        opacity: 0,
        ease: Power3.easeOut
    }, 0.5, bounceOutComplete);
}


function updateMarker() {
    // Reassign marker position
    if ((marker + 3) < allItems.length) {
        marker = marker + 3;
    } else {
        marker = 0;
    }

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