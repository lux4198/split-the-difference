"use client";

import { membersAtom } from "@/app/jotai/groupAtoms";
import { ActionIcon, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";

function CreateMemberForm({ groupId }) {
  const form = useForm();
  const [members, setMembers] = useAtom(membersAtom);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    const postData = async (values) => {
      const response = await fetch("/api/group/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, groupId: groupId }),
      });
      setLoading(true);
      const result = await response.json();
      if (result.status === "success") {
        setLoading(false);
        setMembers([...members, result.data]);
      } else {
        setLoading(false);
      }
    };
    setLoading(true);
    postData(values);
  };
  return (
    <form
      onSubmit={form.onSubmit((values, e) => {
        e.preventDefault();
        form.validate();
        handleSubmit(values);
      })}
      className="flex items-center gap-6 w-full"
    >
      <ActionIcon type="submit" loading={loading}>
        <IconPlus />
      </ActionIcon>
      <TextInput
        disabled={loading}
        required
        placeholder="Name"
        // defaultValue={defaultValues ? defaultValues.name : null}
        {...form.getInputProps("name")}
        className="w-full max-w-[400px]"
      />
    </form>
  );
}

export default CreateMemberForm;
