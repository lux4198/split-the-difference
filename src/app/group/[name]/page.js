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
import { useAtom, useAtomValue } from "jotai";
import {
  expensesAtom,
  groupBaseCurrAtom,
  groupInfoAtom,
  membersAtom,
  netOwesAtom,
  viewMemberAtom,
} from "../groupAtoms";
import SuccessAlert from "@/app/components/SuccessAlert";
import { createPortal } from "react-dom";
import { getMemberByID } from "../selectors";
import { currencyData } from "@/app/lib/currencyData";
import SideNav from "./SideNav";

function Page() {
  const { data: session, status } = useSession();
  const [members, setMembers] = useAtom(membersAtom);
  const viewMember = useAtomValue(viewMemberAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [groupInfo, setGroupInfo] = useAtom(groupInfoAtom);
  const baseCurr = useAtomValue(groupBaseCurrAtom);

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

  const netOwes = useAtomValue(netOwesAtom);
  let viewMemberBalance;
  if (netOwes && viewMember) {
    viewMemberBalance = netOwes[viewMember.id];
  }

  return (
    <main className="flex flex-col">
      <SideNav />
      <div
        className={"mx-auto flex-auto w-full max-w-[600px] p-5 lg:p-12 pt-5"}
      >
        <h2 className="font-medium w-full">Your Balance</h2>
        {members && viewMemberBalance && (
          <div className="w-full p-5">
            <div className="flex flex-col pb-3 border-solid border-0 border-b-2 dark:border-white border-black">
              {Object.keys(viewMemberBalance)
                .filter((id) => viewMemberBalance[id] < 0)
                .map((id) => {
                  const value = viewMemberBalance[id];
                  return (
                    value && (
                      <span>
                        You owe {getMemberByID(members, id).name}{" "}
                        {Math.abs(value)} {currencyData[baseCurr].symbol}
                      </span>
                    )
                  );
                })}
            </div>
            <div className="flex flex-col pt-3">
              {Object.keys(viewMemberBalance)
                .filter((id) => viewMemberBalance[id] > 0)
                .map((id) => {
                  const value = viewMemberBalance[id];
                  return (
                    value && (
                      <span>
                        {getMemberByID(members, id).name} owes you {value}{" "}
                        {currencyData[baseCurr].symbol}
                      </span>
                    )
                  );
                })}
            </div>
          </div>
        )}
        {expenses && (
          <div className="mt-5 m-auto">
            <div className="flex justify-between mb-5">
              <h2 className={"font-medium mb-3"}>Group Expenses</h2>
              {members && (
                <Button
                  rightSection={<IconTablePlus size={14} />}
                  onClick={toggle}
                >
                  Add Expense
                </Button>
              )}
            </div>
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
      </div>
    </main>
  );
}

export default Page;
