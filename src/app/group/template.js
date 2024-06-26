"use client";

import { useEffect, useRef, useState } from "react";
import { Button, CloseButton, Flex, Popover, Tabs } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import TopNavWrap from "@/app/components/TopNavWrap";
import { useAtom, useAtomValue } from "jotai";
import {
  groupInfoAtom,
  membersAtom,
  viewMemberAtomWithPersistence,
} from "../jotai/groupAtoms";
import { memberColors } from "../lib/utils";
import MemberBadge from "@/app/components/Member/MemberBadge";
import { useEscClose } from "../hooks";
import { IconCaretDown } from "@tabler/icons-react";

function Template({ children }) {
  const { status: sessionStatus } = useSession();
  const group = useAtomValue(groupInfoAtom);
  const members = useAtomValue(membersAtom);
  const [viewMember, setViewMember] = useAtom(viewMemberAtomWithPersistence);
  const [viewMemberDrop, setViewMemberDrop] = useState(false);

  useEscClose(viewMemberDrop, () => setViewMemberDrop(false));

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("viewMember") != null
    ) {
      setViewMember(JSON.parse(localStorage.getItem("viewMember")));
    }
  }, []);

  return (
    <>
      <TopNavWrap>
        <Flex gap={"15px"} align={"center"}>
          {group && <span>Group: {group.name}</span>}
          <Popover
            width={150}
            position="bottom"
            shadow="md"
            opened={viewMemberDrop}
            offset={1}
          >
            <Popover.Target>
              <div
                onMouseEnter={() => setViewMemberDrop(true)}
                onMouseLeave={() => setViewMemberDrop(false)}
                onTouchEnd={() => setViewMemberDrop(!viewMemberDrop)}
                className="cursor-pointer flex items-end"
              >
                <MemberBadge
                  name={viewMember && viewMember.name ? viewMember.name : "?"}
                  color={
                    memberColors[
                      viewMember && viewMember.id
                        ? viewMember.id % memberColors.length
                        : 0
                    ]
                  }
                  disableTooltip
                  size={"lg"}
                />
                <IconCaretDown
                  size={12}
                  className={
                    "transition " + (viewMemberDrop ? "rotate-180" : "")
                  }
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown
              onMouseEnter={() => setViewMemberDrop(true)}
              onMouseLeave={() => setViewMemberDrop(false)}
            >
              {members && (
                <div className={"flex flex-col max-h-[200px] overflow-y-auto"}>
                  {members
                    .filter((member) => member.id !== viewMember.id)
                    .map((member) => (
                      <div
                        className="cursor-pointer flex items-center gap-2 p-1 pl-2 hover:bg-gray-200
                    dark:hover:bg-gray-700
                    "
                        onClick={() => {
                          setViewMember(member);
                          setViewMemberDrop(false);
                        }}
                        key={"viewmemberdrop" + member.id}
                      >
                        <MemberBadge
                          name={member.name}
                          color={memberColors[member.id % memberColors.length]}
                          disableTooltip
                        />
                        <span>{member.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </Popover.Dropdown>
          </Popover>
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
      <main className="pb-[100px]">{children}</main>
      <footer className="absolute bottom-0 p-5">
        <a href="https://www.exchangerate-api.com">
          Rates By Exchange Rate API
        </a>
      </footer>
    </>
  );
}

export default Template;
