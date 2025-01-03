"use client";
import NextImage from "next/image";
import styles from "./page.module.css";
import { scroller } from "react-scroll";
import { Flex, rem, Center, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import {
  getCurrentAnswerIndex,
  loadLocalData,
  Leader,
  saveUserData,
  checkCentury,
  loadAchievementData,
  saveAchievementsData,
} from "@/lib/utils";
import { leaders } from "@/lib/data";
import { IconSearch } from "@tabler/icons-react";
import SearchInput from "@/components/ui/SearchInput";
import LeaderFrame from "@/components/ui/LeaderFrame";
import GuessRow from "@/components/ui/GuessRow";
import React from "react";
import { BarChart, PieChart } from "@mantine/charts";
import Achievement from "@/components/ui/Achievement";

const data = leaders;

const LEADERS = new Map<string, Leader>(
  data.map((leader) => [leader.nameSearch, leader])
);

const leaderSearchList = data.map((leader) => leader.nameSearch);

export default function Daily() {
  const [prevGuesses, setPrevGuesses] = useState<Leader[]>([]);
  const [guessesRemaining, setGuessesRemaining] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [answer, setAnswer] = useState<Leader>(data[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    date: string;
    guesses: any;
    gameOver: boolean;
  }>({ date: "", guesses: [], gameOver: false });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const scrollID = useRef("0");
  useEffect(() => {
    const localData = loadLocalData();
    if (!localData.date) {
      // const currentDate = "2024-8-7";
      const currentDate = new Date();
      const currentDateString =
        currentDate.getFullYear().toString() +
        "-" +
        (currentDate.getMonth() + 1).toString() +
        "-" +
        currentDate.getDate().toString();

      setUserData({ date: currentDateString, guesses: [], gameOver: false });
      setPrevGuesses([]);
      setGuessesRemaining(5);
      setGameOver(false);
      setAnswer(data[getCurrentAnswerIndex()]);
      setIsLoading(false);
      return;
    }
    // console.log(localData);
    setUserData(localData);
    setPrevGuesses(localData.guesses);
    setGuessesRemaining(5 - localData.guesses.length);
    setGameOver(localData.gameOver);
    setAnswer(data[getCurrentAnswerIndex()]);
    // const checkDate = "2024-8-7";
    const currentDate = new Date();
    const currentDateString =
      currentDate.getFullYear().toString() +
      "-" +
      (currentDate.getMonth() + 1).toString() +
      "-" +
      currentDate.getDate().toString();

    if (localData.date != currentDateString) {
      saveUserData(currentDateString, [], false);
      setPrevGuesses([]);
      setGameOver(false);
      setGuessesRemaining(5);
      setAnswer(data[getCurrentAnswerIndex()]);
    }
    setIsLoading(false);
  }, []);

  const handleGuess = () => {
    if (!leaderSearchList.includes(currentGuess)) {
      // console.log("error in the name");
      setErrorMessage("Error in the name!");
      setCurrentGuess("");
      return;
    }

    if (
      prevGuesses.filter((guess) => guess.nameSearch == currentGuess).length > 0
    ) {
      //leader already guessed
      // console.log("leader already guessed");

      setErrorMessage("Leader already guessed!");
      setCurrentGuess("");
      return;
    }

    if (answer.name == currentGuess) {
      //display all greens and end game
      // console.log("correct");
      const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);
      saveUserData(userData.date, guesses, true);
      setPrevGuesses(guesses);
      setGameOver(true);
      scroller.scrollTo("endGame", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });
      setGuessesRemaining((guessesRemaining) => guessesRemaining - 1);

      setCurrentGuess("");
      let achievements = loadAchievementData().daily;
      achievements.games += 1;
      achievements.wins += 1;
      switch (5 - guessesRemaining + 1) {
        case 1: {
          achievements.guessOne += 1;
          break;
        }
        case 2: {
          achievements.guessTwo += 1;
          break;
        }
        case 3: {
          achievements.guessThree += 1;
          break;
        }
        case 4: {
          achievements.guessFour += 1;
          break;
        }
        case 5: {
          achievements.guessFive += 1;
          break;
        }
      }
      saveAchievementsData(achievements, loadAchievementData().freePlay);
      return;
    }

    const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);
    const isGameOver = guessesRemaining - 1 <= 0;
    if (isGameOver) {
      scroller.scrollTo("endGame", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });
      let achievements = loadAchievementData().daily;
      achievements.games += 1;
      saveAchievementsData(achievements, loadAchievementData().freePlay);
    }
    saveUserData(userData.date, guesses, isGameOver);
    setPrevGuesses(guesses);
    setGuessesRemaining(guessesRemaining - 1);
    setGameOver(isGameOver);
    setCurrentGuess("");
  };

  const displayGuessResultsRow = () => {
    return prevGuesses?.map((leader, index) => {
      // const [color, text] = checkCentury(leader.century);
      scrollID.current = `leader-${index.toString()}`;
      return (
        <GuessRow
          id={`leader-${index.toString()}`}
          key={index}
          leader={leader}
          answer={answer}
          centuries={checkCentury(leader.century, answer.century)}
        />
      );
    });
  };

  const handleInputChange = (value: string) => {
    setCurrentGuess(value);
    setErrorMessage("");
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Flex direction={{ base: "column", lg: "row" }} pt={{ lg: rem(60) }}>
          <LeaderFrame
            name={answer.name}
            title={answer.title}
            country={answer.nationality}
            image={answer.image}
            link={answer.wikiLink}
            guessNumber={5 - guessesRemaining}
            gameOver={gameOver}
          />

          <Flex
            direction={"column"}
            flex={{ lg: 0.6 }}
            pt={{ lg: rem(80) }}
            p={{ base: rem(15) }}
            align={"center"}
            gap={{ lg: rem(30) }}
          >
            <SearchInput
              currentGuess={currentGuess}
              setCurrentGuess={handleInputChange}
              errorMessage={errorMessage}
              handleGuess={handleGuess}
              guessNumber={5 - guessesRemaining}
              gameOver={gameOver}
            />

            {displayGuessResultsRow()}
            <Achievement
              gameOver={gameOver}
              // barData={loadAchievementData().daily}
              data={loadAchievementData().daily}
              marginTop={rem(80)}
            />
            {/* <PieChart
              mt={rem(80)}
              data={gameData}
              withLabelsLine
              labelsPosition="inside"
              labelsType="percent"
              withLabels
              withTooltip
              tooltipDataSource="segment"
              mx="auto"
              hidden={gameOver}
            />
            <BarChart
              h={300}
              w={rem(800)}
              // mt={rem(100)}
              data={testData}
              dataKey="numberOfGuesses"
              orientation="vertical"
              yAxisProps={{ width: 80 }}
              series={[{ name: "Games", color: "violet.6" }]}
              hidden={gameOver}
            /> */}
          </Flex>
        </Flex>
      )}
    </>
  );
}
