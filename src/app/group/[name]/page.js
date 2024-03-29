"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import ExpenseCard from "@/app/components/ExpenseCard";
import { IconTablePlus } from "@tabler/icons-react";
import CreateModal from "@/app/components/CreateModal";
import CreateExpenseForm from "@/app/components/InputComponents/expense/CreateExpenseForm";
import { useDisclosure } from "@mantine/hooks";
import { useOutsideAlerter, useEscClose } from "@/app/hooks";
import { useAtom } from "jotai";
import { expensesAtom, groupInfoAtom, membersAtom } from "../groupAtoms";
import SuccessAlert from "@/app/components/SuccessAlert";
import { createPortal } from "react-dom";

function Page() {
  const { data: session, status } = useSession();
  const [members, setMembers] = useAtom(membersAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [groupInfo, setGroupInfo] = useAtom(groupInfoAtom);

  const [opened, { close, toggle }] = useDisclosure(false);
  const modalRef = useRef(null);
  const [formActive, setFormActive] = useState(false);
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertTitle, setSuccessAlertTitle] = useState("");
  useOutsideAlerter(modalRef, opened && !formActive, close);
  useEscClose(opened, close);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/group/?name=${session.user.name}`);
      const newData = await response.json();
      if (!members) setMembers(newData.members);
      if (!expenses) setExpenses(newData.expenses);
      if (!groupInfo) setGroupInfo(newData.groupInfo);
    };
    session && fetchData();
  }, [session]);

  return (
    <main className={"ml-10 mr-10"}>
      <h2 className={"font-medium mb-5"}>Your Expenses</h2>
      {members && (
        <Button rightSection={<IconTablePlus size={14} />} onClick={toggle}>
          Add Expense
        </Button>
      )}
      {expenses && (
        <div className="mt-5">
          {expenses
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((expense) => (
              <ExpenseCard
                key={expense.name + expense.id}
                expense={expense}
                members={members}
                setShowSuccessAlert={setShowSuccessAlert}
                setSuccessAlertTitle={setSuccessAlertTitle}
              />
            ))}
        </div>
      )}
      <CreateModal modalRef={modalRef} opened={opened} close={close}>
        {opened && (
          <CreateExpenseForm
            close={close}
            setFormActive={setFormActive}
            setShowSuccessAlert={setShowSuccessAlert}
            setSuccessAlertTitle={setSuccessAlertTitle}
          />
        )}
      </CreateModal>
      {showSucessAlert &&
        createPortal(
          <div className="fixed bottom-3 right-10">
            <SuccessAlert
              title={successAlertTitle}
              setShowSuccessAlert={setShowSuccessAlert}
            />
          </div>,
          document.body,
        )}
    </main>
  );
}

export default Page;
