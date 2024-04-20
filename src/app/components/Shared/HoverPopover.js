import { Popover } from "@mantine/core";
import React, { useState } from "react";

function HoverPopover({ children, content, position = "top" }) {
  const [hover, setHover] = useState(false);
  return (
    <Popover
      position={position}
      opened={hover}
      shadow="md"
      withArrow
      className={"flex items-center justify-center"}
    >
      <Popover.Target>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="h-fit"
        >
          {children}
        </div>
      </Popover.Target>
      <Popover.Dropdown>{content}</Popover.Dropdown>
    </Popover>
  );
}

export default HoverPopover;
