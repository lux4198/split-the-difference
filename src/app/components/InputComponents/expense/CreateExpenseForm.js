"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { useAtom, useAtomValue } from "jotai";
import {
  expensesAtom,
  groupBaseCurrAtom,
  groupIdAtom,
  membersAtom,
} from "../../../group/groupAtoms";
import { useFocusWithin } from "@mantine/hooks";
import { useEffect } from "react";
import ExpenseFormBase from "./expenseFormBase";

function CreateExpenseForm({
  setFormActive,
  close,
  setShowSuccessAlert,
  setSuccessAlertTitle,
}) {
  const groupId = useAtomValue(groupIdAtom);
  const members = useAtomValue(membersAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const baseCurrency = useAtomValue(groupBaseCurrAtom);
  const { ref, focused } = useFocusWithin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (focused) {
      setFormActive(true);
    } else {
      setFormActive(false);
    }
  }, [focused]);

  const form = useForm({
    initialValues: {
      currency: baseCurrency,
      groupId: groupId,
    },
    validate: {
      payedBy: (val) => (val ? null : " "),
    },
  });

  const handleSubmit = (values) => {
    const postData = async (values) => {
      const response = await fetch("/api/group/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (result.status === "success") {
        setLoading(false);
        setExpenses([...expenses, result.data]);
        setShowSuccessAlert(true);
        setSuccessAlertTitle(
          `Successfully created Expense ${result.data.name}.`,
        );
        close();
      }
    };
    setLoading(true);
    postData(values);
  };
  return (
    <ExpenseFormBase
      form={form}
      handleSubmit={handleSubmit}
      loading={loading}
      setFormActive={setFormActive}
      submitButtonText={"Create Expense"}
    />
  );
}

export default CreateExpenseForm;
