// Custom 'in' and 'out' animations
CustomEase.create("customIn", "M0,0 C0,0 0.136,0.462 0.172,0.902 0.182,0.99 0.234,1.048 0.312,1.044 0.363,1.041 0.394,0.978 0.468,0.978 0.524,0.978 0.58,1.01 0.638,1.012 0.726,1.012 0.766,1 0.904,1 0.964,1 1,1 1,1");
CustomEase.create("customOut", "M0,0 C0.344,-0.06 0.544,0.091 0.686,0.198 0.888,0.35 0.99,0.638 1,1");

// DOM elements
//---------------------------------//
const allItems = document.getElementsByClassName('logo');
let master;


// Animation variables
//---------------------------------//
const logosPerRow = 3;
const startY = 150;
const endY = 50;
const spacingX = window.innerWidth/(logosPerRow*2);//220;
console.log('spacingX', spacingX);
console.log('window.innerWidth ', window.innerWidth);



const timing = {
    in:1,
    out:1,
    betweenRows: `-= ${logosPerRow-1}`,
}
// timing.betweenRows: seconds between one timeline end and next timeline start


// Main methods
//---------------------------------//
function createAnimation() {
    initAnimItems();
    master = createTimeline();
    master.play();
}

function initAnimItems() {
    // Set logo at correct x and y. Set opacity to 0.
    let xMarker = 0;
    const logoWidth = getWidthForLogo();
    console.log('logo width', logoWidth);
    for (var i = 0; i < allItems.length; i++) {
        var xPos = (xMarker * spacingX);
        TweenMax.set(allItems[i], { opacity: 0, x: xPos, y: startY, width:logoWidth });
        // Update xMarker
        xMarker = (xMarker + 1 === logosPerRow) ? 0 : xMarker+1;
    }
}

function createTimeline() {
    // Create a master timeline with a timeline for each row
    let tl = new TimelineMax({ paused: true });
    let rowCount = getRowCount();
    // Create 1st timeline and add
    tl.add(createRowTimeline(1));
    // Create subsequent timelines with relevant pause between
    for (let i = 1; i < (rowCount); i++) {
        tl.add(createRowTimeline(i + 1), timing.betweenRows);
    }
    return tl;
}


function createRowTimeline(num) {
    // Returns a timeline for one row
    var tl = new TimelineMax({ repeat: -1, repeatDelay: getRepeatDelay() });

    let marker = getRowStartIndex(num, logosPerRow);
    let elems = [];
    for (let k = 0; k < logosPerRow; k++) {
        elems.push(allItems[marker + k]);
    }

    tl.add('animate-in');
    for (let i = 0; i < logosPerRow; i++) {
        tl.fromTo(elems[i], timing.in, { y: startY, opacity: 0 }, { ease: "customIn", y: endY, opacity: 1 });
    }

    tl.add('animate-out');
    for (let j = 0; j < logosPerRow; j++) {
        tl.to(elems[j], timing.out, { ease: "customOut", y: startY, opacity: 0 });
    }

    return tl;
}


function getRowCount() {
    return Math.floor(allItems.length / logosPerRow);
}

function getRowStartIndex(num, rowMax) {
    return Math.floor((num - 1) * rowMax);
}

function getRepeatDelay() {
    return 2 * (getRowCount() + 1)
}

function getWidthForLogo() {
    return (window.innerWidth/logosPerRow) - (spacingX);
}

// Init
//---------------------------------//
window.onload = function() {
  createAnimation();
};
