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
        <CreateGroupForm />
      </CreateGroupModal>
      {children}
      {/* <div className={"bg-wave"}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            style={{ fill: "#ffd43b" }}
          ></path>
        </svg>
      </div> */}
    </main>
  );
}

export default Template;
