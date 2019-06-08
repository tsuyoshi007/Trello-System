const Trello = require("trello");
const args = process.argv[2];

const trello = new Trello(
  "", //first argument: application key
  "" //second arguemtn: user token
);
const memberId = ""; //argument: id of member of the board

trello.getBoards(memberId, (error, board) => {
  if (error) {
    console.log(error);
  } else {
    trello.getCardsOnBoard(board[0].id, (error, cards) => {//you can specify a specific board here !!!
      if (error) {
        console.log(error);
      } else {
        let resUrl = [];
        cards.forEach(card => {
          card.labels.forEach(label => {
            if (label.name == args) {
              resUrl.push(card.shortUrl);
            }
          });
        });
        if (!resUrl.length) {
          console.log("We can't find the card with the specified label!!!");
        } else {
          console.log(resUrl);
        }
      }
    });
  }
});
