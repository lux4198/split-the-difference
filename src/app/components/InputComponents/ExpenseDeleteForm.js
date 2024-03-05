"use client";

import { expensesAtom } from "@/app/group/groupAtoms";
import { Button, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";

function ExpenseDeleteForm({ expenseId, expenseName, closeModal }) {
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      const response = await fetch("/api/group/expense", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: expenseId,
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setLoading(false);
        setExpenses(expenses.filter((expense) => expense.id !== expenseId));
        closeModal();
      } else {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Are you sure you want to delete the expense: {expenseName} ?</p>
      <Button color={"red"} type="submit" loading={loading}>
        Delete Expense
      </Button>
      {error && (
        <Text color="red">There was an error deleting the expense.</Text>
      )}
    </form>
  );
}

export default ExpenseDeleteForm;
