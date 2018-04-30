// Custom 'in' and 'out' animations
CustomEase.create("customIn", "M0,0 C0,0 0.136,0.462 0.172,0.902 0.182,0.99 0.234,1.048 0.312,1.044 0.363,1.041 0.394,0.978 0.468,0.978 0.524,0.978 0.58,1.01 0.638,1.012 0.726,1.012 0.766,1 0.904,1 0.964,1 1,1 1,1");
CustomEase.create("customOut", "M0,0 C0.344,-0.06 0.544,0.091 0.686,0.198 0.888,0.35 0.99,0.638 1,1");

// GET DOM elements
//---------------------------------//
const allItems = document.getElementsByClassName('logo');



// ANIMATION VARIABLES
//---------------------------------//
const startY = 100;
const endY = 0;
const timing = {
    in:1,
    out:1,
}

let master;
let logosPerRow = 3;
let pauseBetweenTimelines;




// INITIALISE DOM ELEMENTS
//---------------------------------//
function initAnimItems() {
    hideItems();
    setItemsWidth();
    setItemsPos();
}

function createAnimation() {
    initAnimItems();
    master = createTimeline();
    master.play();
}

function hideItems() {
    Array.from(allItems).forEach((item, index) => {
        TweenMax.set(item, { opacity: 0 });
    });
}

function setItemsWidth() {
    const logoWidth = getWidthForLogo();
    // console.log('logo width', logoWidth);
    Array.from(allItems).forEach((item, index) => {
        TweenMax.set(item, { width: logoWidth });
    });
}

function setItemsPos() {
    let xMarker = 0;
    let xPos = 0;
    console.log('logo spacing ', getLogoSpacing())
    Array.from(allItems).forEach((item, index) => {
        xPos = xMarker * getLogoSpacing();
        TweenMax.set(item, { x: xPos, y: startY });
        xMarker = (xMarker + 1 === logosPerRow) ? 0 : xMarker + 1;
    });
}

// CREATE TIMELINES
//---------------------------------//
function createTimeline() {
    if (master != undefined){
        destroyTimeline();
    }
    // console.log('creating timeline');
    // console.log('timing.betweenRows ', getPauseBetweenTimelines());
    // console.log('logosPerRow ', logosPerRow);
    console.log('------------------');
    // Create a master timeline with a timeline for each row
    let tl = new TimelineMax({ paused: true });
    let rowCount = getRowCount();
    // Create 1st timeline and add
    tl.add(createRowTimeline(1));
    // Create subsequent timelines with relevant pause between
    for (let i = 1; i < (rowCount); i++) {
        tl.add(createRowTimeline(i + 1), getPauseBetweenTimelines());
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

function destroyTimeline(){
    if (master != undefined){
        console.log('clearing master timeline')
        master.clear();
    }
}


// GET DYNAMIC VARIABLES
//---------------------------------//
function getRowCount() {
    return Math.floor(allItems.length / logosPerRow);
}

function getRowStartIndex(num, rowMax) {
    return Math.floor((num - 1) * rowMax);
}

function getRepeatDelay() {
    return 2 * (getRowCount() + 1)
}

function getLogoContainerWidth(){
    let parentWidth = window.innerWidth;
    // let parentWidth = document.defaultView.getComputedStyle(allItems[0].parentNode, "").getPropertyValue("width");
    // parentWidth = parentWidth.match(/\d+/)[0]; // Get num from pixel string
    console.log('window.innerWidth ', window.innerWidth);
    // console.log('parentWidth', parentWidth);
    return parentWidth;
}

function getWidthForLogo() {
    // return (getLogoContainerWidth()/logosPerRow) - getLogoSpacing();
    return (getLogoContainerWidth()/logosPerRow);
}

function getLogoSpacing() {
    // return getLogoContainerWidth()/(logosPerRow*2);
    // return getLogoContainerWidth()/3;
    return getWidthForLogo();
}

function getPauseBetweenTimelines(){
    return `-= ${logosPerRow-1}`;
}



// ON RESIZE
//---------------------------------//
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)}


function onResize(){
    // If windowsize is less then 395 set logosPerRow to 2.
    if (window.innerWidth < 500) {
        logosPerRow = 2;
    } else {
        logosPerRow = 3;
    }
    createAnimation();
}

window.addEventListener('resize', function() {
    requestAnimationFrame(onResize)
}, false)



// ON LOAD
//---------------------------------//
window.onload = function() {
  createAnimation();
};


// MAXIMISE
//---------------------------------//
// Pause animation
// Shuffle up remaining rows
// Expand 'logo container' div
function maximise(){
  master.pause();
     itemsToGrid();
}

function minimise(){
    itemsToStart();
}

// Each logo has an assigned x,y position with the 'grid'
// xpos always stays the same, assign a new y pos here
// Move them from where they are to the destination position.
function itemsToGrid() {
    var elems = allItems;
    var startPos = 100;
    var markerX = 0;
    var markerY = 0;
    var posY = 0;
    for (var i = 0; i < elems.length; i++) {

        // Establish a y pos for this item
        posY = startPos + (markerY * spacingY)

        // When we have reached max num of logos per row
        // Set x marker back to 0; increment y marker
        if (markerX === (logosPerRow - 1)) {
            markerX = 0;
            markerY++;
        } else {
            // Otherwise, just increment x marker
            markerX++;
        }
        // Set logo at xpos
        TweenMax.to(elems[i], 0.6, { opacity:1, y: posY, ease: Power1.easeIn });
    }
}

// Move logos back to their starting y positions
function itemsToStart(){
        TweenMax.staggerTo(allItems, 0.6, {opacity:0, y: startY, ease: Power1.easeIn, onComplete:restart});
}

function restart() {
    master.play();
}