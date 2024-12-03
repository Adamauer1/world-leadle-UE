"use client";
import { Dialog, Modal, Text, Title, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const NewUserModule = () => {
  let hasShownModule = false;
  //hasShownCookies = localStorage.getItem("shownCookies") == "shown" || false;
  const [opened, { toggle, close }] = useDisclosure(!hasShownModule);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Welcome to World Leadle!">
        <Text>
          Press the Daily button to play the daily game mode. This game mode is
          only playable once a day, but your progress is saved. <br />
          <br />
          Press the FreePlay button to play the freeplay game mode. This will
          allow you to play unlimited times.
        </Text>
      </Modal>
      {/* <Dialog opened={opened} withCloseButton onClose={close} w={"auto"}>
        <Title order={5}>Welcome to World Leadle</Title>
        <Text>
          Press the Daily button to play the daily game mode. This game mode is
          only playable once a day, but your progress is saved. Press the
          FreePlay button to play the freeplay game mode. This will allow you to
          play unlimited times.
        </Text>
      </Dialog> */}
    </>
  );
};

export default NewUserModule;
