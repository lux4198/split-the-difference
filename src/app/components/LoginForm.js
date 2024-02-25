"use client";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Grid, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { authenticate } from "@/app/lib/actions";

function LoginForm() {
  const form = useForm();
  const [visible, { toggle }] = useDisclosure(false);
  const [pwErr, setPwErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    status: "idle",
  });

  const handleLogin = (values) => {
    authenticate({}, values).then((value) => {
      if (value.status === "failed") {
        setLoginStatus(value);
      }
    });
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => handleLogin(values))}
      className="max-w-[430px]"
    >
      <Grid>
        <Grid.Col span={12}>
          <TextInput
            required
            label="Group Name"
            placeholder="Enter group name"
            {...form.getInputProps("name")}
            onFocus={() => setLoginStatus("")}
            error={loginStatus.status === "failed" ? true : false}
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
            onFocus={() => setLoginStatus("")}
            error={loginStatus.status === "failed" ? true : false}
          />
        </Grid.Col>
        {loginStatus.status === "failed" && (
          <Grid.Col span={12}>
            <Text c={"red"}>{loginStatus.msg}</Text>
          </Grid.Col>
        )}
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
