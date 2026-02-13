// Card game data — each entry becomes a card in the deck
const CARD_GAMES = [
  {
    id: "poker",
    name: "Poker",
    suit: "spade",
    rank: "A",
    color: "#e74c3c",
    description: "The king of bluffing games"
  },
  {
    id: "blackjack",
    name: "Blackjack",
    suit: "club",
    rank: "K",
    color: "#2ecc71",
    description: "Beat the dealer to 21"
  },
  {
    id: "solitaire",
    name: "Solitaire",
    suit: "heart",
    rank: "Q",
    color: "#3498db",
    description: "The classic single-player game"
  },
  {
    id: "bridge",
    name: "Bridge",
    suit: "diamond",
    rank: "J",
    color: "#9b59b6",
    description: "A partnership trick-taking game"
  },
  {
    id: "rummy",
    name: "Rummy",
    suit: "heart",
    rank: "10",
    color: "#e67e22",
    description: "Match cards into sets and runs"
  },
  {
    id: "war",
    name: "War",
    suit: "spade",
    rank: "9",
    color: "#1abc9c",
    description: "Flip and compare — highest wins"
  },
  {
    id: "go-fish",
    name: "Go Fish",
    suit: "diamond",
    rank: "8",
    color: "#f39c12",
    description: "Got any threes?"
  },
  {
    id: "crazy-eights",
    name: "Crazy Eights",
    suit: "club",
    rank: "8",
    color: "#e74c3c",
    description: "Match suit or rank to shed cards"
  },
  {
    id: "hearts",
    name: "Hearts",
    suit: "heart",
    rank: "7",
    color: "#c0392b",
    description: "Avoid the queen of spades"
  },
  {
    id: "spades",
    name: "Spades",
    suit: "spade",
    rank: "6",
    color: "#2c3e50",
    description: "Bid and take tricks with a trump"
  },
  {
    id: "uno",
    name: "UNO",
    suit: "diamond",
    rank: "5",
    color: "#e74c3c",
    description: "The colorful card-shedding classic"
  },
  {
    id: "snap",
    name: "Snap",
    suit: "club",
    rank: "4",
    color: "#27ae60",
    description: "Fast reflexes win the pile"
  }
];

// Suit symbols
const SUIT_SYMBOLS = {
  spade:   "&#9824;",
  heart:   "&#9829;",
  diamond: "&#9830;",
  club:    "&#9827;"
};

const SUIT_COLORS = {
  spade:   "#1a1a2e",
  heart:   "#c0392b",
  diamond: "#c0392b",
  club:    "#1a1a2e"
};
