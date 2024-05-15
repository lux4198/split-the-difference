"use client";

import React, { useEffect, useState, useRef } from "react";
import { ActionIcon, Badge, Button, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import ExpenseCard from "@/app/components/ExpenseCard";
import { IconMinus, IconTablePlus } from "@tabler/icons-react";
import CreateModal from "@/app/components/CreateModal";
import CreateExpenseForm from "@/app/components/InputComponents/expense/CreateExpenseForm";
import { useDisclosure } from "@mantine/hooks";
import { useOutsideAlerter, useEscClose } from "@/app/hooks";
import { useAtom, useAtomValue } from "jotai";
import {
  expensesAtom,
  groupBaseCurrAtom,
  groupIdAtom,
  groupInfoAtom,
  membersAtom,
  viewMemberAtomWithPersistence,
} from "../groupAtoms";
import SuccessAlert from "@/app/components/SuccessAlert";
import { createPortal } from "react-dom";
import { getMemberByID } from "../selectors";
import { currencyData } from "@/app/lib/currencyData";
import SideNav from "./SideNav";
import MainPageWrap from "../MainPageWrap";
import { getSumOfArray } from "@/app/lib/calcUtils";
import MemberBadge from "@/app/components/MemberBadge";
import { memberColors } from "@/app/lib/utils";
import BalancePage from "../BalancePage";
import PaymentsPage from "../PaymentsPage";
import ExpenseDeleteForm from "@/app/components/InputComponents/expense/ExpenseDeleteForm";
import ExpenseEditForm from "@/app/components/InputComponents/expense/ExpenseEditForm";
import LoadingCard from "@/app/components/Shared/LoadingCard";
import SettingsPage from "../SettingsPage";

function Page() {
  const { data: session, status } = useSession();
  const groupId = useAtomValue(groupIdAtom);
  const [members, setMembers] = useAtom(membersAtom);
  const [viewMember, setViewMember] = useAtom(viewMemberAtomWithPersistence);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [groupInfo, setGroupInfo] = useAtom(groupInfoAtom);
  const baseCurr = useAtomValue(groupBaseCurrAtom);

  const [navSelected, setNavSelected] = useState("expenses");
  const isNavSelected = (nav) => {
    return navSelected === nav;
  };
  const [opened, { close, toggle }] = useDisclosure(false);
  const [
    expenseOpened,
    { close: expenseClose, toggle: expenseToggle, open: expenseOpen },
  ] = useDisclosure(false);
  const [
    viewMemberOpened,
    { close: viewMemberClose, toggle: viewMemberToggle, open: viewMemberOpen },
  ] = useDisclosure(false);
  const [editFormActive, setEditFormActive] = useState(false);
  const [expenseAction, setExpenseAction] = useState("");
  const [expenseSelected, setExpenseSelected] = useState(null);

  const modalRef = useRef(null);
  const [formActive, setFormActive] = useState(false);
  const [showSucessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertTitle, setSuccessAlertTitle] = useState("");
  const [expenseCreateDefault, setExpenseCreateDefault] = useState({});
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

  useEffect(() => {
    if (!opened) {
      setExpenseCreateDefault({});
    }
  }, [opened]);

  useEffect(() => {
    if (Object.keys(viewMember).length === 0) {
      viewMemberOpen();
    } else {
      viewMemberClose();
    }
  }, [viewMember]);

  return (
    <main className="flex flex-col md:flex-row md:min-h-[100vh]">
      <SideNav navSelected={navSelected} setNavSelected={setNavSelected} />
      <div className={"mx-auto flex-auto w-full p-5 m-auto md:m-0 md:ml-10"}>
        {isNavSelected("expenses") && (
          <MainPageWrap title={"Group Expenses"}>
            {expenses && (
              <div className="mb-5 m-auto">
                {members && (
                  <Button
                    rightSection={<IconTablePlus size={14} />}
                    onClick={toggle}
                  >
                    Add Expense
                  </Button>
                )}
              </div>
            )}
            {expenses ? (
              expenses
                .filter((e) => e.type !== "payment")
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((expense) => (
                  <ExpenseCard
                    key={expense.name + expense.id}
                    expense={expense}
                    members={members}
                    setShowSuccessAlert={setShowSuccessAlert}
                    setSuccessAlertTitle={setSuccessAlertTitle}
                    setAction={setExpenseAction}
                    setExpenseSelected={setExpenseSelected}
                    open={expenseOpen}
                    close={expenseClose}
                    opened={expenseOpened}
                  />
                ))
            ) : (
              <div className="mt-4">
                {[...new Array(10)].map((num, idx) => (
                  <LoadingCard key={"expenseLoader" + idx} />
                ))}
              </div>
            )}
          </MainPageWrap>
        )}
        {isNavSelected("balance") && (
          <>
            <MainPageWrap title={"Your Balance"}>
              <BalancePage
                members={members}
                toggleExpenseInput={toggle}
                setExpenseCreateDefault={setExpenseCreateDefault}
              />
            </MainPageWrap>
          </>
        )}
        {isNavSelected("payments") && (
          <MainPageWrap title={"Your Payments"}>
            <PaymentsPage
              toggleExpenseInput={toggle}
              members={members}
              setAction={setExpenseAction}
              open={expenseOpen}
              setExpenseSelected={setExpenseSelected}
            />
          </MainPageWrap>
        )}
        {isNavSelected("settings") && members && (
          <MainPageWrap title={"Group Settings"}>
            <SettingsPage members={members} groupId={groupId} />
          </MainPageWrap>
        )}
        <CreateModal modalRef={modalRef} opened={opened} close={close}>
          {opened && (
            <CreateExpenseForm
              close={close}
              setFormActive={setFormActive}
              setShowSuccessAlert={setShowSuccessAlert}
              setSuccessAlertTitle={setSuccessAlertTitle}
              isPayment={isNavSelected("payments") || isNavSelected("balance")}
              defaultValues={expenseCreateDefault}
              setDefaultValues={setExpenseCreateDefault}
            />
          )}
        </CreateModal>
        {expenseOpened && (
          <CreateModal
            modalRef={modalRef}
            close={expenseClose}
            opened={expenseOpened}
          >
            {expenseAction === "edit" ? (
              <ExpenseEditForm
                expense={expenseSelected}
                setFormActive={setEditFormActive}
                close={expenseClose}
                setShowSuccessAlert={setShowSuccessAlert}
                setSuccessAlertTitle={setSuccessAlertTitle}
              />
            ) : (
              expenseAction === "delete" && (
                <ExpenseDeleteForm
                  closeModal={expenseClose}
                  expenseId={expenseSelected.id}
                  expenseName={expenseSelected.name}
                  expenseType={expenseSelected.type}
                  setShowSuccessAlert={setShowSuccessAlert}
                  setSuccessAlertTitle={setSuccessAlertTitle}
                />
              )
            )}
          </CreateModal>
        )}
        {members && viewMemberOpened && (
          <CreateModal
            modalRef={modalRef}
            close={viewMemberClose}
            opened={viewMemberOpened}
            withClose={false}
          >
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
          </CreateModal>
        )}
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
