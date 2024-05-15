"use client";

import { Accordion } from "@mantine/core";
import CreateMemberForm from "../components/InputComponents/CreateMemberForm";

function SettingsPage({ members, groupId }) {
  console.log(members);
  return (
    <div className="max-w-[70%]">
      <Accordion variant="contained">
        <Accordion.Item value="member">
          <Accordion.Control>Edit Members</Accordion.Control>
          <Accordion.Panel>
            {members.map((member) => (
              <div>{member.name}</div>
            ))}
            <div>+ Add new Member</div>
            <CreateMemberForm groupId={groupId} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default SettingsPage;
