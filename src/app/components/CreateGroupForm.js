"use client";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Grid, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function CreateGroupForm({ onSubmit, close }) {
  const [visible, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const [postErr, setPostErr] = useState(false);
  const [msg, setMsg] = useState("");
  const form = useForm();
  const router = useRouter();

  const handleSubmit = (values) => {
    setLoading(true);

    const pw = values.password;
    const confPW = values.confirmPassword;
    if (pw !== confPW) {
      setPwErr(true);
      setLoading(false);
      return;
    }
    // Call onSubmit callback with form data
    const fetchData = async () => {
      const response = await fetch("/api/group/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const res = await response.json();
      if (res.code !== "") {
        setPostErr(res.code);
      }
      if (res.status === "success") {
        router.push("/group/");
      }
    };

    fetchData();

    setLoading(false);
  };

  const getErrMsgFromCode = (code) => {
    let msg = "";
    if (code === "P2002") {
      msg = "Group name already taken.";
    }

    return msg;
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
              error={postErr !== "" ? getErrMsgFromCode(postErr) : false}
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
              error={pwErr ? "Passwords do not match." : false}
              onInput={() => setPwErr(false)}
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
              error={pwErr}
              onInput={() => setPwErr(false)}
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
