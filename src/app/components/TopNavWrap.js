"use client";

import { Button, Flex } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useColorScheme } from "@/app/hooks";
import Link from "next/link";

function TopNavWrap({ children }) {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Flex justify={"space-between"} align={"center"}>
      <Link href={"/"} className="no-underline text-inherit">
        <h2>split-the-difference</h2>
      </Link>
      <Flex>
        {children}
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
  );
}

export default TopNavWrap;
