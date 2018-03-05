/* TO DO
- Initialisation:
- Arrange grid of logos

- On button click:
- Look at marker index and select next 3. Do their intro anim
- If 3 logos have already been selected, do their outro anim

(I think both these animations can happen at the same time
rather than one after the other?)


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
var logo_07 = document.querySelector('#logo-07');
var logo_08 = document.querySelector('#logo-08');
var logo_09 = document.querySelector('#logo-09');

var allItems = [
	logo_01, logo_02, logo_03,
	logo_04, logo_05, logo_06,
	logo_07, logo_08, logo_09
]; 	

var displayY = 100;

// All logo elements
var selectedItems = [];				// 3 currently selected logo elements
var marker = 0; 					// Index selection is at

btnBounceUp.addEventListener('click', function () {
	// If there are any existing displayed logos remove them
	console.log('selected.length ', selectedItems.length);
		if (selectedItems.length > 0){
        	bounceOut();
    	} else {
    		bounceIn();
    	}
});

function bounceInComplete () {
	updateMarker();
	console.log('bounceIn complete');

}

function bounceOutComplete () {
	console.log('bounceOut complete');
	bounceIn();
}


function bounceIn() {
	// Select next 3 logos to move, and store a ref to them
	selectedItems = [allItems[marker], allItems[marker+1], allItems[marker+2]];
	// Enter them
	TweenMax.staggerTo(selectedItems, 1.5, {
    cycle:{
      y: function(index) { 
      	var itemY = selectedItems[index].getBoundingClientRect().y;
      	var destY = displayY - itemY;
      	return destY;
      }
    },
    ease: "customAnim"
  }, 0.5, bounceInComplete);
}

function bounceOut() {
	var animItems = selectedItems.slice(0);
	TweenMax.staggerTo(animItems, 0.3, {
	  scaleX:0,
	   scaleY:0
	}, 0.3, bounceOutComplete);
}


function updateMarker(){
	// Reassign marker position
	if ((marker+3) < allItems.length){
		marker = marker+3;
	} else {
		marker = 0;
	}
	console.log('marker ', marker);
}




// TweenLite.to(".logo", 2, { ease: "hop", scale:1.5, rotation:30 });