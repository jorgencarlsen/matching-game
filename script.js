//Get the value of the range slider and display it.
//Select how many cards to play with
function getRangeValue(rangeValue){
    const currentValue = document.getElementById('currentvalue');
    currentValue.innerHTML = rangeValue;
}

//display a message that asks if the user is ready and note that game will be timed.

//array shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
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

//color variables
const color1 = 'rgba(23, 26, 33, 1)';
const color2 = 'rgba(97, 112, 115, 1)';//default card color
const color3 = 'rgba(122, 147, 172, 1)';
const color4 = 'rgba(146, 188, 234, 1)';
const color5 = 'rgba(175, 179, 247, 1)';
const color6 = '#A71D31';
const color7 = '#3F0D12';

//create array of all the colors except the default color;
let colors = [color1, color1, color5, color5, color3, color3, color4, color4];

//shuffle the color array.
let shuffledColors = [];

//create an object that collects card objs that contain their colors.
let cardData = {};

//function to change color of card.
function changeColor(){
    cardId = this.id;
    this.style.background = cardData[cardId].color;
    cardData[cardId].open = true;
    let openCount = 0;
    let openCards = [];
    //iterate through the card data object keys
    for (prop in cardData){
        //check if a card is open
        if (cardData[prop].open === true){
            //if a card is open add it to the openCount.
            openCount++;
            //add it's id to the open cards array;
            openCards.push(prop);
        }
    }
   
    

    //sets two cards background color to white
    function backGroundWhite(card1, card2){
        card1.style.background = "white";
        card2.style.background = "white";
        card1.style.outline = '0px';
        card2.style.outline = '0px';
    }

    //sets two cards background color to default
    function backGroundDefault(card1, card2){
        card1.style.background = color2;
        card2.style.background = color2;
    }

    //get the open cards elements
    const card1 = document.getElementById(openCards[0]);
    const card2 = document.getElementById(openCards[1]);

   //if only one card has been flipped, do nothing.
   if (openCards.length < 2){
        return;
    } else {
        if (cardData[openCards[0]].color === cardData[openCards[1]].color) {
        
            //if cardData.openCards[0].color equals cardData.openCards[1].color
                //set card 1 and card 2 to background color of white after 2 seconds.
            setTimeout(backGroundWhite, 300, card1, card2);
            cardData[openCards[0]].open = false;
            cardData[openCards[1]].open = false;
            card1.removeEventListener('click', changeColor);
            card2.removeEventListener('click', changeColor);
        } else { 
            //else
            //set card 1 and card 2 to background color of tomato after 2 seconds.
            setTimeout(backGroundDefault, 500, card1, card2);
            cardData[openCards[0]].open = false;
            cardData[openCards[1]].open = false;
        }
    }
    
}


function createCards(){
    //Get number of cards from input
    const currentValue = document.getElementById('currentvalue');
    const numCards = currentValue.innerHTML;
    
    //get the gameboard html
    const gameBoard = document.querySelector('.gameboard');
    
    //check if the number of divs in the gameBoard is equal to the current value and return if so.
    if (gameBoard.childElementCount === currentValue){
        return;
    }
        
        //if no
            //delete all the elements in the game board and run the loop
    let firstCard = gameBoard.firstElementChild;
   
    while (firstCard){
        firstCard.remove();
        firstCard = gameBoard.firstElementChild;
    }
    
    //if the number of cards is 12
        //add two more colors to the color array
    if (numCards === '12'){
        for (i = 0; i < 2; i++){
            colors.push(color6);
            colors.push(color7);
        }
    }

    shuffledColors = shuffle(colors);

    //create a number of cards(divs) equal to input
    for (let i = 1; i <= numCards; i++){
        newCard = document.createElement('div');
        newCard.setAttribute('class', 'card');
        newCard.setAttribute('id', i);

        //Add event listener to change color on click
        newCard.addEventListener('click', changeColor);
        
        //add the card to the gameboard
        gameBoard.appendChild(newCard);
        
        //assign a color to the card
        cardData[i] = {
            color: shuffledColors.pop(),
            open: false
        };   
    }  
}

const cardNumSubmitButton = document.getElementById('cardselectorbutton');
cardNumSubmitButton.addEventListener('click', createCards);
//create js that alters the css when hovered over

//create js that flips the card on click

//it should allow two cards to be flipped
    //if the two flipped cards are the same color

        //it should delete both cards with some sort of animation
        //empty space should remain when the cards are deleted.
    //if the two cards don't match color
        //the cards should flip back

//when all the cards have been flipped
    //display a message saying goodjob it took x amount of time to complete the game!
    //ask if they would like to play again.
        //if yes,
            //reset the game
            //save previous time to compare to result next time.
