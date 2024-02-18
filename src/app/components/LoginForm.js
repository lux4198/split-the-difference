"use client";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Grid, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { authenticate } from "@/app/lib/actions";

function LoginForm() {
  const form = useForm();
  const [visible, { toggle }] = useDisclosure(false);
  const [pwErr, setPwErr] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={form.onSubmit((values) => authenticate({}, values))}
      className="max-w-50"
    >
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
          <PasswordInput
            required
            label="Password"
            defaultValue=""
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("password")}
            error={pwErr ? "Wrong Password." : false}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default LoginForm;
