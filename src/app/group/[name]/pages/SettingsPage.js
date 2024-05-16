"use client";

import { Accordion, ActionIcon } from "@mantine/core";
import CreateMemberForm from "../../../components/InputComponents/CreateMemberForm";
import { memberColors } from "@/app/lib/utils";
import MemberBadge from "@/app/components/Member/MemberBadge";
import { IconEdit, IconTrash } from "@tabler/icons-react";

function SettingsPage({
  members,
  groupId,
  open,
  setAction,
  setMemberSelected,
}) {
  return (
    <div className="max-w-[700px] w-full">
      <Accordion variant="contained">
        <Accordion.Item value="member">
          <Accordion.Control icon={<IconEdit stroke={"gray-200"} />}>
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
      </Accordion>
    </div>
  );
}

export default SettingsPage;
