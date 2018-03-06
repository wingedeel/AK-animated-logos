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




// All logo elements
var selectedItems = []; // 3 currently selected logo elements
var marker = 0; // Index selection is at

var tl = new TimelineMax({paused:true, repeat:-1});

btnBounceUp.addEventListener('click', function() {
     createTimeline();
    // simpleTest1();
});


var config = {
    durationInEach:2,
    durationInBetween: 1,
    durationOutEach:2,
    durationOutBetween: 1,
}

var startY = 500;
var endY = 0;
// var opacity = 0; // 0 or 1



/*
Look at how many logos there are and create a timeline animation
*/

function createTimeline(){
    
    // Select next set of logos to animate
    marker=0;
    var elements;
    var elementsExit;

    do {

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

         marker = marker+3;

    } while ((marker + 3) < allItems.length);


    tl.play();
}

function simpleTest1 () {
   

    TweenMax.set(allItems[0], {x:200, y:endY, opacity:1});
    TweenMax.set(allItems[3], {x:200, y:startY, opacity:0.5});

     var tl = new TimelineMax({paused:true, repeat:-1});
    tl.to(allItems[0], 2, {ease:Power2.easeOut, y:startY, opacity:0.5});
    tl.to(allItems[3], 2, {ease:Power2.easeIn,y:endY, opacity:1});
    tl.to(allItems[0], 2, {ease:Power2.easeIn,y:endY, opacity:1}, "-=1");
    tl.to(allItems[3], 2, {ease:Power2.easeOut,y:startY, opacity:0.5});

    tl.play();
}

// function createSingleTimeline(){
    
//     // Select next set of logos to animate
//     marker=0;
//     var element= allItems[marker];
//     var elementsExit;

    

//     TweenMax.set(element, { x: 200, y: startY, opacity: 0 })
//     TweenMax.to(element, config.durationInEach, {
//             y: endY,
//             opacity: 1,
//             ease: "customIn"
//         }, config.durationInBetween);
//         selectedItems = elements;

//         // Animate out 3 logos (slightly before the previous stagger completes)
//         elementsExit = selectedItems.slice(0);
//         tl.staggerTo(elementsExit, config.durationOutEach, {
//             y: startY,
//             opacity: 0,
//             ease: "customOut"
//         }, config.durationOutBetween);

//          marker = marker+3;

//     } while ((marker + 3) < allItems.length);


//     tl.play();
// }


function animInComplete(){
    console.log('anim in complete');
}
function animOutComplete(){
    console.log('anim out complete');
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