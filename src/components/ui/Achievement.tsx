import { Center, Flex, rem, Text, useMantineColorScheme } from "@mantine/core";
import styles from "@/components/styles/GuessRow.module.css";
import { BarChart, PieChart } from "@mantine/charts";
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
  barData,
  pieData,
}: {
  gameOver: boolean;
  barData: any;
  pieData: any;
}) {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      {gameOver ? (
        <>
          <PieChart
            mt={rem(80)}
            data={pieData}
            withLabelsLine
            labelsPosition="inside"
            labelsType="percent"
            withLabels
            withTooltip
            tooltipDataSource="segment"
            mx="auto"
          />
          <BarChart
            h={300}
            w={rem(800)}
            // mt={rem(100)}
            data={barData}
            dataKey="numberOfGuesses"
            orientation="vertical"
            yAxisProps={{ width: 80 }}
            series={[{ name: "Games", color: "violet.6" }]}
          />{" "}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
