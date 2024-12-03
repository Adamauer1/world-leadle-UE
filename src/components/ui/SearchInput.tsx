import { useHardMode } from "@/contexts/HardModeContext";
import styles from "@/components/styles/SearchInput.module.css";
import { leaders } from "@/lib/data";
import {
  ActionIcon,
  Autocomplete,
  Flex,
  rem,
  stylesToString,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
const data = leaders;
const leaderSearchList = data.map((leader) => leader.nameSearch).sort();

export default function SearchInput({
  currentGuess,
  setCurrentGuess,
  handleGuess,
  errorMessage,
  guessNumber,
  gameOver,
}: {
  currentGuess: string;
  setCurrentGuess: any;
  handleGuess: any;
  errorMessage: string;
  guessNumber: number;
  gameOver: boolean;
}) {
  const { isHardMode } = useHardMode();

  return (
    <>
      {/* <Flex w={"100%"} justify={"center"} gap={}> */}
      <Autocomplete
        w={{ base: "95%", lg: "70%" }}
        size="lg"
        data={isHardMode ? [] : leaderSearchList}
        error={errorMessage}
        rightSection={
          <>
            <UnstyledButton
              className={styles.button}
              onClick={handleGuess}
              disabled={gameOver}
              w={rem(320)}
              h={"100%"}
            >
              <Text>{`Search (${guessNumber}/5)`}</Text>
            </UnstyledButton>
          </>
        }
        placeholder="Type here ..."
        value={currentGuess}
        onChange={setCurrentGuess}
        disabled={gameOver}
        styles={{
          section: {
            width: rem(150),
            height: "100%",
            padding: 0,
            margin: 0,
            top: 0,
          },
        }}
      />
      {/* <Text>Test</Text>
      </Flex> */}
    </>
  );
}
