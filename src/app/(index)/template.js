"use client";

import { Button, Flex } from "@mantine/core";
import { useEscClose } from "../hooks";
import { useDisclosure } from "@mantine/hooks";
import CreateModal from "@/app/components/Shared/CreateModal";
import CreateGroupForm from "@/app/components/Group/CreateGroupForm";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "../hooks";
import LoginForm from "@/app/components/LoginForm";
import { signOut, useSession } from "next-auth/react";
import TopNavWrap from "@/app/components/TopNavWrap";
import Link from "next/link";

function Template({ children }) {
  const { data: session, status: sessionStatus } = useSession();
  const [signUp, setSignUp] = useState(true);
  const [opened, { close, toggle }] = useDisclosure(false);
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, opened, close);
  useEscClose(opened, close);

  return (
    <>
      <TopNavWrap>
        <Flex>
          {sessionStatus === "authenticated" ? (
            <>
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
              <Button variant="filled" radius={"xs"} className={"mr-4"}>
                <Link href={`/group/${session.user.name}/`}>
                  Go To Your Group
                </Link>
              </Button>
            </>
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
      <main className="p-5">
        <CreateModal modalRef={modalRef} opened={opened} close={close}>
          {signUp ? <CreateGroupForm close={close} /> : <LoginForm />}
        </CreateModal>
        {children}
      </main>
    </>
  );
}

export default Template;
