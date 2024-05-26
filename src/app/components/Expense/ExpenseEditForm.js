import React, { useState } from "react";
import ExpenseFormBase from "./ExpenseFormBase";
import { useForm } from "@mantine/form";
import { useAtomValue, useAtom } from "jotai";
import { membersAtom, expensesAtom } from "@/app/jotai/groupAtoms";

function ExpenseEditForm({
  expense,
  setFormActive,
  close,
  setShowSuccessAlert,
  setSuccessAlertTitle,
}) {
  const members = useAtomValue(membersAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const payedByMember = members.find(
    (member) => member.id === expense.memberId,
  );
  const form = useForm({
    initialValues: { ...expense, payedBy: { id: expense.memberId } },
  });
  const handleSubmit = (values) => {
    const patchData = async (values) => {
      const response = await fetch("/api/group/expense", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, id: expense.id }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setExpenses([
          ...expenses.filter((exp) => exp.id !== expense.id),
          result.data,
        ]);
        setShowSuccessAlert(true);
        setSuccessAlertTitle(
          `Successfully edited Expense ${result.data.name}.`,
        );
        close();
      } else {
        setLoading(false);
      }
    };
    setLoading(true);
    patchData(values);
  };
  const [loading, setLoading] = useState(false);
  return (
    <ExpenseFormBase
      form={form}
      handleSubmit={handleSubmit}
      loading={loading}
      submitButtonText={"Edit Expense"}
      defaultValues={{ ...expense, payedBy: payedByMember }}
      setFormActive={setFormActive}
    />
  );
}

export default ExpenseEditForm;
