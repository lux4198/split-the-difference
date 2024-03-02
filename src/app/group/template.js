"use client";

import { Button, Flex } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import TopNavWrap from "@/app/components/TopNavWrap";

function Template({ children }) {
  const { status: sessionStatus } = useSession();

  return (
    <main className="p-5">
      <TopNavWrap>
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
        </Flex>
      </TopNavWrap>
      {children}
    </main>
  );
}

export default Template;
