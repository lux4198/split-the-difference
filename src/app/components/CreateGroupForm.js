"use client";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Grid, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function CreateGroupForm({ onSubmit, close }) {
  const [visible, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const form = useForm();

  const handleSubmit = (values) => {
    setLoading(true);

    const pw = values.password;
    const confPW = values.confirmPassword;
    if (pw !== confPW) {
      setErr(true);
      setLoading(false);
      return;
    }
    // Call onSubmit callback with form data
    console.log(values);

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              required
              label="Group Name"
              placeholder="Enter group name"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              required
              type="email"
              label="Email Address"
              placeholder="Enter email address"
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              required
              label="Password"
              defaultValue=""
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps("password")}
              error={err ? "Passwords do not match." : false}
              onInput={() => setErr(false)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              required
              label="Confirm password"
              defaultValue=""
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps("confirmPassword")}
              error={err}
              onInput={() => setErr(false)}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Text>
              The password will be used for you and others to log into your
              group.
            </Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="submit" loading={loading}>
              Create Group
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}
