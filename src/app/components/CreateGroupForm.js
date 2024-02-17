"use client";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Grid } from "@mantine/core";

export default function CreateGroupForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const form = useForm();

  const handleSubmit = (values) => {
    setLoading(true);

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
