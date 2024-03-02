"use client";

import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Page() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [members, setMembers] = useState(null);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/group/?name=${session.user.name}`);
      const newData = await response.json();
      setMembers(newData.members);
      setExpenses(newData.expenses);
    };
    session && fetchData();
  }, [session]);

  return (
    <>
      <h2>Group Page</h2>
      {members &&
        members.map((member) => (
          <Text key={member.name + member.id}>{member.name}</Text>
        ))}
      {expenses &&
        expenses.map((expense) => (
          <>
            <Text key={expense.name + expense.id}>{expense.name}</Text>
            <Text>Members: </Text>
            {expense.members.map((member) => (
              <span>{member.name + ", "}</span>
            ))}
          </>
        ))}
    </>
  );
}

export default Page;
