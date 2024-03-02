"use client";

import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ExpenseCard from "@/app/components/ExpenseCard";

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
    <main className={"ml-10 mr-10"}>
      <h2 className={"font-medium mb-5"}>Your Expenses</h2>
      {expenses &&
        expenses.map((expense) => (
          <ExpenseCard
            key={expense.name + expense.id}
            expense={expense}
            members={members}
          />
        ))}
    </main>
  );
}

export default Page;
