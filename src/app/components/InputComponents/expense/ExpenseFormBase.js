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
} from "../../../group/groupAtoms";
import { currencyCodes, currencyData } from "../../../lib/currencyData";
import { useFocusWithin } from "@mantine/hooks";
import { useEffect } from "react";
import { MemberInputMultiple } from "../MemberInputMultiple";
import { memberColors } from "../../../lib/utils";
import { MemberInputSingle } from "../MemberInputSingle";

function ExpenseFormBase({
  form,
  setFormActive,
  handleSubmit,
  loading,
  defaultValues = null,
  submitButtonText,
}) {
  const groupId = useAtomValue(groupIdAtom);
  const members = useAtomValue(membersAtom);
  const baseCurrency = useAtomValue(groupBaseCurrAtom);
  const { ref, focused } = useFocusWithin();

  useEffect(() => {
    if (focused) {
      setFormActive(true);
    } else {
      setFormActive(false);
    }
  }, [focused]);

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
            defaultValue={defaultValues ? defaultValues.name : null}
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
            defaultValue={defaultValues ? defaultValues.payedBy : null}
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
            defaultValue={defaultValues ? defaultValues.value : null}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            disabled={loading}
            required
            label="Currency"
            searchable
            defaultValue={defaultValues ? defaultValues.currency : baseCurrency}
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
            defaultValue={defaultValues ? defaultValues.membersSharing : null}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit" loading={loading}>
            {submitButtonText}
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default ExpenseFormBase;
