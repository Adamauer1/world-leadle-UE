"use client";
import NextImage from "next/image";
import styles from "@/app/submit-leader/page.module.css";
import { scroller } from "react-scroll";
import {
  Flex,
  rem,
  UnstyledButton,
  Center,
  Loader,
  TextInput,
  Group,
  Button,
  Text,
  Container,
  Image,
  RingProgress,
} from "@mantine/core";
import { useEffect, useReducer, useRef, useState } from "react";
import { checkCentury, Leader } from "@/lib/utils";
import { leaders } from "@/lib/data";
import SearchInput from "@/components/ui/SearchInput";
import LeaderFrame from "@/components/ui/LeaderFrame";
import GuessRow from "@/components/ui/GuessRow";
import React from "react";
import { useForm } from "@mantine/form";

export default function SubmitLeader() {
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState(false);
  const [value, setValue] = useState(0);
  const [previewValues, setPreviewValues] = useState<formValues>();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      title: "",
      country: "",
      region: "",
      century: "",
      imageLink: "",
      wikiLink: "",
    },

    validate: {
      name: (value) => (value.length != 0 ? null : "Required Full Name"),
      title: (value) => (value.length != 0 ? null : "Required Title"),
      country: (value) => (value.length != 0 ? null : "Required Country"),
      region: (value) => (value.length != 0 ? null : "Required Region"),
      century: (value) => (value.length != 0 ? null : "Required Century"),
      imageLink: (value) => (value.length != 0 ? null : "Required Image Link"),
      wikiLink: (value) =>
        value.length != 0 ? null : "Required Wikipedia Link",
    },

    onValuesChange: (values) => {
      setPreviewValues(values);
      let newPercentage = 0;
      if (values.name != "" || undefined) {
        newPercentage += 14;
      }
      if (values.title != "" || undefined) {
        newPercentage += 14;
      }
      if (values.country != "" || undefined) {
        newPercentage += 14;
      }
      if (values.region != "" || undefined) {
        newPercentage += 14;
      }
      if (values.century != "" || undefined) {
        newPercentage += 14;
      }
      if (values.imageLink != "" || undefined) {
        newPercentage += 14;
      }
      if (values.wikiLink != "" || undefined) {
        newPercentage += 16;
      }
      setValue(newPercentage);
    },
  });

  type formValues = typeof form.values;

  const handleSubmit = (value: any) => {
    console.log("successful submission");
  };

  let leader = {
    name: previewValues?.name,
    title: previewValues?.title,
    nationality: previewValues?.country,
    continent: previewValues?.region,
    century: previewValues?.century,
  };

  const handleTest = (value: boolean) => {
    setTest(value);
  };
  return (
    <>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Button className={styles.control} onClick={() => handleTest(false)}>
            Test 1
          </Button>
          <Button className={styles.control} onClick={() => handleTest(true)}>
            Test 2
          </Button>
          {test ? (
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify={"space-around"}
              align={"center"}
              flex={1}
              pt={{ lg: rem(60) }}
              w={"100%"}
            >
              <Flex direction={"column"}>
                <LeaderFrame
                  name={
                    previewValues?.name == undefined
                      ? "George Washington"
                      : previewValues.name
                  }
                  title={
                    previewValues?.title == undefined
                      ? "President"
                      : previewValues.title
                  }
                  country={
                    previewValues?.country == undefined
                      ? "United States of America"
                      : previewValues.country
                  }
                  image={
                    previewValues?.imageLink == undefined
                      ? "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
                      : previewValues.imageLink
                  }
                  link={
                    previewValues?.wikiLink == undefined
                      ? "https://en.wikipedia.org/wiki/George_Washington"
                      : previewValues.wikiLink
                  }
                  guessNumber={5}
                  gameOver={true}
                />
                <GuessRow
                  id={"1"}
                  key={1}
                  leader={leader}
                  answer={leader}
                  centuries={["green", "\u{02713}"]}
                />
              </Flex>
              <Flex direction={"column"} w={rem(600)}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput
                    label="Name"
                    placeholder="George Washington"
                    {...form.getInputProps("name")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Title"
                    placeholder="President"
                    {...form.getInputProps("title")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Country"
                    placeholder="United States of America"
                    {...form.getInputProps("country")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Region"
                    placeholder="North America"
                    {...form.getInputProps("region")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Century"
                    placeholder="18"
                    {...form.getInputProps("century")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Image Link"
                    placeholder="https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
                    {...form.getInputProps("imageLink")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Wikipedia Link"
                    placeholder="https://en.wikipedia.org/wiki/George_Washington"
                    {...form.getInputProps("wikiLink")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <Group justify="center" mt="md">
                    <Button type="submit" className={styles.control}>
                      Submit
                    </Button>
                  </Group>
                </form>
              </Flex>
            </Flex>
          ) : (
            <Flex
              direction={{ base: "column" }}
              // justify={"space-around"}
              gap={rem(30)}
              align={"center"}
              flex={1}
              pt={{ lg: rem(60) }}
              w={"100%"}
            >
              <Flex direction={"column"} w={rem(600)}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput
                    label="Name"
                    placeholder="George Washington"
                    {...form.getInputProps("name")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Title"
                    placeholder="President"
                    {...form.getInputProps("title")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Country"
                    placeholder="United States of America"
                    {...form.getInputProps("country")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Region"
                    placeholder="North America"
                    {...form.getInputProps("region")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Century"
                    placeholder="18"
                    {...form.getInputProps("century")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Image Link"
                    placeholder="https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
                    {...form.getInputProps("imageLink")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <TextInput
                    label="Wikipedia Link"
                    placeholder="https://en.wikipedia.org/wiki/George_Washington"
                    {...form.getInputProps("wikiLink")}
                    classNames={{
                      input: styles.input,
                      label: styles.inputLabel,
                    }}
                  />
                  <Group justify="center" mt="md">
                    <Button type="submit" className={styles.control}>
                      Submit
                    </Button>
                  </Group>
                </form>
              </Flex>
              <RingProgress
                sections={[{ value, color: "blue" }]}
                transitionDuration={250}
                label={<Text ta="center">{value}%</Text>}
              />
            </Flex>
          )}
        </>
      )}
    </>
  );
}
