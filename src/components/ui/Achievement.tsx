import {
  Button,
  Center,
  Flex,
  rem,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import styles from "@/components/styles/GuessRow.module.css";
import { BarChart, PieChart } from "@mantine/charts";
import { useState } from "react";
// const barData = [
//   { numberOfGuesses: "1", Games: 1 },
//   { numberOfGuesses: "2", Games: 2 },
//   { numberOfGuesses: "3", Games: 10 },
//   { numberOfGuesses: "4", Games: 20 },
//   { numberOfGuesses: "5", Games: 30 },
// ];
// const pieData = [
//   { name: "Wins", value: 400, color: "green.6" },
//   { name: "Loses", value: 300, color: "red.6" },
// ];
export default function Achievement({
  gameOver,
  data,
  marginTop,
}: {
  gameOver: boolean;
  data: any;
  marginTop: string;
}) {
  const { colorScheme } = useMantineColorScheme();
  const [testValue, setTestValue] = useState(true);
  const barData = [
    { numberOfGuesses: "1", Games: data.guessOne },
    { numberOfGuesses: "2", Games: data.guessTwo },
    { numberOfGuesses: "3", Games: data.guessThree },
    { numberOfGuesses: "4", Games: data.guessFour },
    { numberOfGuesses: "5", Games: data.guessFive },
  ];
  const pieData = [
    { name: "Wins", value: data.wins, color: "green.6" },
    { name: "Loses", value: data.games - data.wins, color: "red.6" },
  ];

  const handleTest = (value: boolean) => {
    setTestValue(value);
  };

  return (
    <>
      {gameOver ? (
        <>
          <Flex direction={"row"} gap={rem(8)}>
            <Button onClick={() => handleTest(true)}>
              <Text>Test 1</Text>
            </Button>
            <Button onClick={() => handleTest(false)}>
              <Text>Test 2</Text>
            </Button>
          </Flex>
          {testValue ? (
            <>
              <Flex direction={"column"} gap={rem(8)} justify={"center"}>
                <Text>{`Games Played: ${data.games}`}</Text>
                <Text>{`Win Percentage: ${data.wins / data.games}`}</Text>
                <Text>{`First Guess Wins: ${data.guessOne}`}</Text>
                <Text>{`Second Guess Wins: ${data.guessTwo}`}</Text>
                <Text>{`Third Guess Wins: ${data.guessThree}`}</Text>
                <Text>{`Fourth Guess Wins: ${data.guessFour}`}</Text>
                <Text>{`Fifth Guess Wins: ${data.guessFive}`}</Text>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                direction={"row"}
                align={"center"}
                mt={marginTop}
                gap={rem(20)}
              >
                <Title order={4}>Win Percentage</Title>
                <PieChart
                  data={pieData}
                  withLabelsLine
                  labelsPosition="inside"
                  labelsType="percent"
                  withLabels
                  withTooltip
                  tooltipDataSource="segment"
                  mx="auto"
                />
              </Flex>
              <Title order={4}>Wins on Guess Number</Title>
              <BarChart
                h={300}
                w={rem(600)}
                // mt={rem(100)}
                data={barData}
                dataKey="numberOfGuesses"
                orientation="vertical"
                yAxisProps={{ width: 80 }}
                series={[{ name: "Games", color: "violet.6" }]}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
