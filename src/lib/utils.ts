import { leaders } from "./data";
var seedrandom = require("seedrandom");

export interface Leader {
  name: string;
  title: string;
  nationality: string;
  continent: string;
  century: string[];
  image: string;
  wikiLink: string;
  nameSearch: string;
}

export const getCurrentAnswerIndex = () => {
  const currentDate = new Date();
  const currentDateString =
    currentDate.getFullYear().toString() +
    "-" +
    (currentDate.getMonth() + 1).toString() +
    "-" +
    currentDate.getDate().toString();

  // const { date } = JSON.parse(
  //   localStorage.getItem("daily") ?? currentDateString
  // );
  const date = currentDateString;
  const generator = seedrandom(date);

  return Math.floor(generator() * leaders.length);
};

export const deleteOldLocalData = () => {
  if (localStorage.getItem("current-date")) {
    localStorage.removeItem("current-date");
  }
  if (localStorage.getItem("guessesLeft")) {
    localStorage.removeItem("guessesLeft");
  }
};

export const loadLocalData = () => {
  const { date, guesses, gameOver } = JSON.parse(
    localStorage.getItem("daily") ?? "{}"
  );
  return {
    date: date,
    guesses: guesses,
    gameOver: gameOver,
  };
};

export const saveUserData = (
  date: string,
  guesses: Leader[],
  gameOver: boolean
) => {
  localStorage.setItem(
    "daily",
    JSON.stringify({ date: date, guesses: guesses, gameOver })
  );
};

export const loadAchievementData = () => {
  if (localStorage.getItem("achievements") == null) {
    saveAchievementsData(
      {
        games: 0,
        wins: 0,
        guessOne: 0,
        guessTwo: 0,
        guessThree: 0,
        guessFour: 0,
        guessFive: 0,
      },
      {
        games: 0,
        wins: 0,
        guessOne: 0,
        guessTwo: 0,
        guessThree: 0,
        guessFour: 0,
        guessFive: 0,
      }
    );
  }
  const { daily, freePlay } = JSON.parse(
    localStorage.getItem("achievements") ?? "{}"
  );
  return { daily: daily, freePlay: freePlay };
};

export const saveAchievementsData = (
  daily: {
    games: number;
    wins: number;
    guessOne: number;
    guessTwo: number;
    guessThree: number;
    guessFour: number;
    guessFive: number;
  },
  freePlay: {
    games: number;
    wins: number;
    guessOne: number;
    guessTwo: number;
    guessThree: number;
    guessFour: number;
    guessFive: number;
  }
) => {
  localStorage.setItem(
    "achievements",
    JSON.stringify({ daily: daily, freePlay: freePlay })
  );
};

export const checkCentury = (
  centuries: string[],
  correctCenturies: string[]
) => {
  let color = "red";
  let check = false;
  for (let time of centuries) {
    if (correctCenturies.includes(time)) {
      color = "yellow";
    } else {
      check = true;
    }
  }
  if (centuries.length != correctCenturies.length) {
    check = true;
  }
  if (color === "yellow" && !check) {
    color = "green";
  }
  let text = "";
  switch (color) {
    case "green":
      text = "\u{02713}";
      break;
    case "yellow":
      text = "\u{2248}";
      break;
    case "red":
      if (centuries[0] > correctCenturies[0]) {
        text = "\u{02193}";
      } else {
        text = "\u{02191}";
      }
      break;
    default:
      break;
  }
  return [color, text];
};
