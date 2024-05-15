"use client";

import { membersAtom } from "@/app/group/groupAtoms";
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
      className="flex items-center gap-6"
    >
      <ActionIcon type="submit">
        <IconPlus />
      </ActionIcon>
      <TextInput
        // disabled={loading}
        required
        placeholder="Name"
        // defaultValue={defaultValues ? defaultValues.name : null}
        {...form.getInputProps("name")}
        className="w-1/3"
      />
    </form>
  );
}

export default CreateMemberForm;
