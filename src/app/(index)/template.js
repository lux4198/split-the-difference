"use client";

import { Button, Flex } from "@mantine/core";
import { useEscClose } from "../hooks";
import { useDisclosure } from "@mantine/hooks";
import CreateModal from "../components/CreateModal";
import CreateGroupForm from "../components/CreateGroupForm";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "../hooks";
import LoginForm from "../components/LoginForm";
import { signOut, useSession } from "next-auth/react";
import TopNavWrap from "../components/TopNavWrap";

function Template({ children }) {
  const { status: sessionStatus } = useSession();
  const [signUp, setSignUp] = useState(true);
  const [opened, { close, toggle }] = useDisclosure(false);
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, opened, close);
  useEscClose(opened, close);

  return (
    <main className="p-5">
      <TopNavWrap>
        <Flex>
          {sessionStatus === "authenticated" ? (
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
          ) : (
            (sessionStatus === "unauthenticated" ||
              sessionStatus === "loading") && (
              <>
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
              </>
            )
          )}
        </Flex>
      </TopNavWrap>
      <CreateModal modalRef={modalRef} opened={opened} close={close}>
        {signUp ? <CreateGroupForm close={close} /> : <LoginForm />}
      </CreateModal>
      {children}
    </main>
  );
}

export default Template;
