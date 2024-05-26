"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { useAtom, useAtomValue } from "jotai";
import {
  expensesAtom,
  groupBaseCurrAtom,
  groupIdAtom,
  membersAtom,
  viewMemberAtom,
} from "../../jotai/groupAtoms";
import { useFocusWithin } from "@mantine/hooks";
import { useEffect } from "react";
import ExpenseFormBase from "./ExpenseFormBase";

function CreateExpenseForm({
  setFormActive,
  close,
  setShowSuccessAlert,
  setSuccessAlertTitle,
  isPayment,
  defaultValues,
  setDefaultValues,
}) {
  const groupId = useAtomValue(groupIdAtom);
  const members = useAtomValue(membersAtom);
  const viewMember = useAtomValue(viewMemberAtom);
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
      value: defaultValues.value ?? null,
      sharedBy: defaultValues.sharedBy ?? null,
      payedBy: isPayment ? viewMember : null,
      type: isPayment ? "payment" : "",
      name: isPayment ? "payment" : "",
    },
    validate: {
      payedBy: (val) => (val ? null : " "),
      sharedBy: (val) => (val && val.length > 0 && val[0] != null ? null : " "),
    },
  });

  const handleSubmit = (values) => {
    setDefaultValues({});
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
          isPayment
            ? `Successfully added Payment.`
            : `Successfully created Expense ${result.data.name}.`,
        );
        close();
      } else {
        setLoading(false);
      }
      console.log(result);
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
      submitButtonText={isPayment ? "Make Payment" : "Create Expense"}
      isPayment={isPayment}
      defaultValues={
        isPayment ? { payedBy: viewMember, ...defaultValues } : null
      }
    />
  );
}

export default CreateExpenseForm;
