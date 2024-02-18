"use client";

import { Button, Flex, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useColorScheme, useEscClose } from "./hooks";
import { useDisclosure } from "@mantine/hooks";
import CreateGroupModal from "./components/CreateGroupModal";
import CreateGroupForm from "./components/CreateGroupForm";
import { useEffect, useRef } from "react";
import { useOutsideAlerter } from "./hooks";

function Template({ children }) {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const [opened, { close, toggle }] = useDisclosure(false);
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, opened, close);
  useEscClose(opened, close);

  const dark = colorScheme === "dark";
  return (
    <main className="p-5">
      <Flex justify={"space-between"} align={"center"}>
        <h2>split-the-difference</h2>
        <Flex>
          <Button
            variant="filled"
            radius={"xs"}
            className={"mr-4"}
            onClick={toggle}
          >
            Create Group
          </Button>
          <Button
            onClick={() => {
              toggleColorScheme();
            }}
            variant="filled"
            radius={"xl"}
          >
            {colorScheme === "dark" ? <IconMoon /> : <IconSun />}
          </Button>
        </Flex>
      </Flex>
      <CreateGroupModal modalRef={modalRef} opened={opened} close={close}>
        <CreateGroupForm close={close} />
      </CreateGroupModal>
      {children}
    </main>
  );
}

export default Template;
