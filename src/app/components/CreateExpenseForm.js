"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { Grid, TextInput, Button, NumberInput, Select } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import {
  expensesAtom,
  groupBaseCurrAtom,
  groupIdAtom,
  membersAtom,
} from "../group/groupAtoms";
import { currencyCodes, currencyData } from "../lib/currencyData";
import { useFocusWithin } from "@mantine/hooks";
import { useEffect } from "react";
import { MemberInputMultiple } from "./InputComponents/MemberInputMultiple";
import { memberColors } from "../lib/utils";
import { MemberInputSingle } from "./InputComponents/MemberInputSingle";

function CreateExpenseForm({ setFormActive, close }) {
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
        close();
      }
    };
    setLoading(true);
    postData(values);
  };
  return (
    <form
      onSubmit={form.onSubmit((values, e) => {
        e.preventDefault();
        handleSubmit(values);
      })}
      className="max-w-[430px]"
    >
      <Grid>
        <Grid.Col span={8}>
          <TextInput
            disabled={loading}
            required
            label="Name"
            placeholder="Expense name"
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MemberInputSingle
            disabled={loading}
            label="Payed by"
            members={members}
            colors={memberColors}
            form={form}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <NumberInput
            disabled={loading}
            required
            label="Amount"
            placeholder="Amount of Expense."
            allowNegative={false}
            decimalScale={2}
            hideControls
            {...form.getInputProps("value")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            disabled={loading}
            required
            label="Currency"
            searchable
            defaultValue={baseCurrency}
            data={currencyCodes}
            ref={ref}
            {...form.getInputProps("currency")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <MemberInputMultiple
            disabled={loading}
            label="Shared by"
            members={members}
            colors={memberColors}
            form={form}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit" loading={loading}>
            Add Expense
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default CreateExpenseForm;
