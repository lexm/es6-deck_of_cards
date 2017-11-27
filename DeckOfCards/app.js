'use strict';

class Card {
    constructor(suitNum, rankNum) {
        var suitNames = [ "Clubs", "Spades", "Hearts", "Diamonds" ];
        var cardNames = [ "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King" ];
        this.suitNum = suitNum;
        this.rankNum = rankNum;
        this.suit = suitNames[suitNum];
        this.rank = cardNames[rankNum];
    }
}

class Deck {
    constructor() {
        this.cards = [];
        for (var sNum = 0; sNum < 4; sNum++) {
            for (var rNum = 0; rNum < 13; rNum++) {
                this.cards.push(new Card(sNum, rNum));
            }
        }
    }
    deal() {
        return this.cards.pop();
    }
    reset() {
        this.cards = [];
        for (var sNum = 0; sNum < 4; sNum++) {
            for (var rNum = 0; rNum < 13; rNum++) {
                this.cards.push(new Card(sNum, rNum));
            }
        }
        return this;
    }
    shuffle() {
        var pos = this.cards.length;
        while (pos > 1) {
            let rand = Math.floor(Math.random() * pos);
            pos--;
            var tempCard = this.cards[rand];
            this.cards[rand] = this.cards[pos];
            this.cards[pos] = tempCard;
        }
        return this;
    }
}

class Player {
    constructor(pName) {
        this.name = pName;
        this.hand = [];
    }
    draw(deck) {
        var drawn = deck.deal();
        this.hand.push(drawn);
        return drawn;
    }
    discard(index) {
        if (index < 0 || index >= this.hand.length) {
            return null;
        } else {
            return this.hand.splice(index, 1)[0];
        }
    }
    showHand() {
        this.hand.forEach(function (card, idx) {
            console.log(`Card number ${idx}: ${card.rank} of ${card.suit}`);
        });
    }
}

var myDeck = new Deck();
var player1 = new Player("Joe");
myDeck.shuffle();
for (var i = 0; i < 5; i++) {
    player1.draw(myDeck);
}
var third = player1.discard(2);
console.log(`Pulled card: ${third.rank} of ${third.suit}`);
console.log("Rest of hand:");
player1.showHand();
while (player1.hand.length > 0) {
    player1.discard(0);
}
console.log("Resetting...");
myDeck.reset().shuffle();
for (var i = 0; i < 5; i++) {
    player1.draw(myDeck);
}
player1.showHand();