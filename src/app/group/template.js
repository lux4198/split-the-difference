"use client";

import { useRef, useState } from "react";
import { Button, CloseButton, Flex, Popover } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import TopNavWrap from "@/app/components/topNavWrap";
import { MemberInputSingle } from "../components/inputComponents/memberInputSingle";
import { useAtom, useAtomValue } from "jotai";
import { membersAtom, viewMemberAtomWithPersistence } from "./groupAtoms";
import { memberColors } from "../lib/utils";
import MemberBadge from "../components/memberBadge";
import { useEscClose } from "../hooks";

function Template({ children }) {
  const { status: sessionStatus } = useSession();
  const members = useAtomValue(membersAtom);
  const [viewMember, setViewMember] = useAtom(viewMemberAtomWithPersistence);
  const [viewMemberDrop, setViewMemberDrop] = useState(false);

  useEscClose(viewMemberDrop, () => setViewMemberDrop(false));

  return (
    <>
      <TopNavWrap>
        <Flex gap={"15px"} align={"center"}>
          <Popover
            width={200}
            position="bottom"
            shadow="md"
            opened={viewMemberDrop}
          >
            <Popover.Target>
              <div
                onClick={() => setViewMemberDrop(!viewMemberDrop)}
                className="cursor-pointer"
              >
                <MemberBadge
                  name={viewMember.name}
                  color={memberColors[viewMember.id % memberColors.length]}
                  disableTooltip
                  size={"lg"}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              {members && (
                <div className="">
                  <div className="absolute top-0 right-0">
                    <CloseButton onClick={() => setViewMemberDrop(false)} />
                  </div>
                  <MemberInputSingle
                    required={false}
                    label={"Select Member"}
                    members={members}
                    colors={memberColors}
                    onChange={(val) => {
                      setViewMember(val);
                      setViewMemberDrop(false);
                    }}
                    defaultValue={viewMember}
                  />
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
      <main className="p-5 pb-[100px]">{children}</main>
      <footer className="absolute bottom-0 p-5">
        <a href="https://www.exchangerate-api.com">
          Rates By Exchange Rate API
        </a>
      </footer>
    </>
  );
}

export default Template;
