"use client";

import { groupIdAtom } from "@/app/jotai/groupAtoms";
import { memberColors } from "@/app/lib/utils";
import { useAtomValue } from "jotai";
import CreateMemberForm from "../InputComponents/CreateMemberForm";
import MemberBadge from "./MemberBadge";

function MemberSelectCreateModal({ members, setViewMember, viewMemberClose }) {
  const groupId = useAtomValue(groupIdAtom);
  return (
    <div className="min-w-[300px] min-h-[100px]">
      {members.length > 0 && (
        <>
          <span className="mb-4">Select Member</span>
          <div className="w-fit h-fit flex gap-2 max-w-[200px] flex-wrap">
            {members.map((member) => {
              return (
                <div
                  key={"modalMemberSelect" + member.id}
                  className="cursor-pointer"
                >
                  <MemberBadge
                    classNameWrap={"cursor-pointer"}
                    color={memberColors[member.id % memberColors.length]}
                    name={member.name}
                    size="lg"
                    onClick={() => {
                      setViewMember(member);
                      viewMemberClose();
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      <span className="mb-4">Add Members to group:</span>
      <div className="w-full">
        <CreateMemberForm groupId={groupId} />
      </div>
    </div>
  );
}

export default MemberSelectCreateModal;
