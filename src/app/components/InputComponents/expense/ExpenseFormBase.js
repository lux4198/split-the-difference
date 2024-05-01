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
import { IconCreditCardPay } from "@tabler/icons-react";

export default function ExpenseFormBase({
  form,
  setFormActive,
  handleSubmit,
  loading,
  defaultValues = null,
  submitButtonText,
  isPayment,
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
        form.validate();
        e.preventDefault();
        handleSubmit(values);
      })}
      className="max-w-[430px]"
    >
      <Grid>
        {!isPayment && (
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
        )}
        <Grid.Col span={isPayment ? 6 : 4}>
          <MemberInputSingle
            disabled={loading}
            label={isPayment ? "From" : "Payed by"}
            members={members}
            colors={memberColors}
            onChange={(val) => form.setFieldValue("payedBy", val)}
            defaultValue={defaultValues ? defaultValues.payedBy : null}
          />
        </Grid.Col>
        {isPayment && (
          <Grid.Col span={6}>
            <MemberInputSingle
              error={form.errors.sharedBy}
              disabled={loading}
              label="To"
              members={members}
              colors={memberColors}
              onChange={(val) => form.setFieldValue("sharedBy", [val])}
              defaultValue={
                defaultValues && defaultValues.sharedBy
                  ? defaultValues.sharedBy[0]
                  : null
              }
            />
          </Grid.Col>
        )}
        {isPayment && <Grid.Col span={8} />}
        <Grid.Col span={8}>
          <NumberInput
            disabled={loading}
            required
            label="Amount"
            placeholder={``}
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
        {!isPayment && (
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
        )}
        <Grid.Col span={12}>
          <Button type="submit" loading={loading}>
            {isPayment ? (
              <IconCreditCardPay />
            ) : (
              <span>{submitButtonText}</span>
            )}
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
