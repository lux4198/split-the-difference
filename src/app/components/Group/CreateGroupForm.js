"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Grid, PasswordInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function CreateGroupForm({ onSubmit, close }) {
  const [visible, { toggle }] = useDisclosure(false);
  const [pwErr, setPwErr] = useState(false);
  const [postErr, setPostErr] = useState(false);
  const [msg, setMsg] = useState("");
  const form = useForm();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, e) => {
    e.preventDefault();

    const pw = values.password;
    const confPW = values.confirmPassword;
    if (pw !== confPW) {
      setPwErr(true);
      return;
    }

    const fetchData = async () => {
      setErrMsg(null);
      setSuccess(null);
      setLoading(true);
      const response = await fetch("/api/group/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const res = await response.json();
      if (res.status === "failed") {
        setPostErr(res.code);
        setErrMsg(res.msg);
        setLoading(false);
      }
      if (res.status === "success") {
        setSuccess(true);
        setLoading(false);
      }
    };

    fetchData();
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
          {success && (
            <Grid.Col span={12}>
              <Text c="green">Successfully created new group!</Text>
            </Grid.Col>
          )}
          <Grid.Col span={12}>
            <TextInput
              required
              label="Group Name"
              placeholder="Enter group name"
              {...form.getInputProps("name")}
              error={postErr !== "" ? getErrMsgFromCode(postErr) : false}
              disabled={loading}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              required
              type="email"
              label="Email Address"
              placeholder="Enter email address"
              {...form.getInputProps("email")}
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </Grid.Col>
          {errMsg && (
            <Grid.Col span={12}>
              <Text c="red">{errMsg}</Text>
            </Grid.Col>
          )}
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
