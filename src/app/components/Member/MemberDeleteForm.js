"use client";

import { expensesAtom, membersAtom } from "@/app/jotai/groupAtoms";
import { Button, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";

function MemberDeleteForm({
  memberId,
  memberName,
  closeModal,
  setShowSuccessAlert,
  setSuccessAlertTitle,
}) {
  const [members, setMembers] = useAtom(membersAtom);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      const response = await fetch("/api/group/member", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: memberId,
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        console.log(result);
        setLoading(false);
        setMembers(members.filter((member) => member.id !== memberId));
        closeModal();
        setSuccessAlertTitle(`Successfully deleted Member ${memberName}.`);
        setShowSuccessAlert(true);
      } else {
        console.log(result);
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Are you sure you want to delete the member {memberName}?</p>
      <Button color={"red"} type="submit" loading={loading}>
        Delete Member
      </Button>
      {error && <Text c="red">There was an error deleting the member.</Text>}
    </form>
  );
}

export default MemberDeleteForm;
