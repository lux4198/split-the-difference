"use client";

import { Accordion, ActionIcon, Card, Button } from "@mantine/core";
import CreateMemberForm from "../../../components/InputComponents/CreateMemberForm";
import { memberColors } from "@/app/lib/utils";
import MemberBadge from "@/app/components/Member/MemberBadge";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  groupIdAtom,
  viewMemberAtomWithPersistence,
} from "@/app/jotai/groupAtoms";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function SettingsPage({
  members,
  groupId,
  open,
  setAction,
  setMemberSelected,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setViewMember = useSetAtom(viewMemberAtomWithPersistence);
  const handleGroupDelete = () => {
    const fetchData = async () => {
      const response = await fetch("/api/group/", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: groupId,
        }),
      });
      const result = await response.json();
      setLoading(false);
      if (result && result.status === "success") {
        setViewMember({});
        signOut();
        router.push("/");
      }
    };
    setLoading(true);
    groupId && fetchData();
  };
  return (
    <div className="max-w-[700px] w-full flex flex-col gap-12">
      <Accordion variant="contained">
        <Accordion.Item value="member">
          <Accordion.Control icon={<IconEdit />}>
            Edit Members
          </Accordion.Control>
          <Accordion.Panel>
            <>
              {members.map((member) => (
                <div className="p-2 flex justify-between border-0 border-solid border-b-[1px] border-gray-300">
                  <div className="flex gap-3">
                    <MemberBadge
                      color={memberColors[member.id % memberColors.length]}
                      name={member.name}
                      size="lg"
                      disableTooltip
                    />
                    <span className="">{member.name}</span>
                  </div>
                  <ActionIcon
                    size={"sm"}
                    className="ml-2"
                    color="red"
                    onClick={() => {
                      open();
                      setAction("delete");
                      setMemberSelected(member);
                    }}
                  >
                    <IconTrash size={17} />
                  </ActionIcon>
                </div>
              ))}
            </>
            <div className="flex w-full flex-col gap-2 pt-4">
              <div>+ Add new Member</div>
              <CreateMemberForm groupId={groupId} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="delete group">
          <Accordion.Control icon={<IconTrash />}>
            <span className="text-lg">Delete Group</span>
          </Accordion.Control>
          <Accordion.Panel>
            <div className="flex flex-col gap-3">
              <span className="pb-3">
                All information related to this group will be deleted. This
                action cannot be undone.
              </span>
              <div>
                <Button
                  loading={loading}
                  color="red"
                  onClick={() => handleGroupDelete()}
                >
                  Delete Group
                </Button>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default SettingsPage;
