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
import React, { useState } from "react";
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
  const [searchData, setSearchData] = useState(leaderSearchList);

  const handleFilterData = () => {};

  return (
    <>
      {/* <Flex w={"100%"} justify={"center"} gap={rem(4)}> */}
      <Autocomplete
        w={{ base: "95%", lg: "70%" }}
        size="lg"
        // data={isHardMode ? [] : leaderSearchList}
        data={searchData}
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
      {/* <ActionIcon
          //onClick={handleFilterData}
          onClick={() => {
            setSearchData(handleFilterData());
          }}
          variant="filled"
          color="#7cc1d8"
          classNames={{
            root: styles.actionIconRoot,
            icon: styles.actionIconIcon,
          }}
          styles={{
            root: {
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
            },
          }}
        > */}
      {/* <IconSearch size={36} /> */}
      {/* <IconSearch /> */}
      {/* </ActionIcon> */}
      {/* <Text>Test</Text> */}
      {/* </Flex> */}
    </>
  );
}
