"use client";

import { Button, Flex, useMantineTheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useColorScheme, useEscClose } from "./hooks";
import { useDisclosure } from "@mantine/hooks";
import CreateGroupModal from "./components/CreateGroupModal";
import CreateGroupForm from "./components/CreateGroupForm";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "./hooks";
import LoginForm from "./components/LoginForm";
import { signOut } from "next-auth/react";

function Template({ children }) {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const [signUp, setSignUp] = useState(true);
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
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </Button>
          <Button
            variant="filled"
            radius={"xs"}
            className={"mr-4"}
            onClick={() => {
              setSignUp(false);
              toggle();
            }}
          >
            Login
          </Button>
          <Button
            variant="filled"
            radius={"xs"}
            className={"mr-4"}
            onClick={() => {
              setSignUp(true);
              toggle();
            }}
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
        {signUp ? <CreateGroupForm close={close} /> : <LoginForm />}
      </CreateGroupModal>
      {children}
    </main>
  );
}

export default Template;
