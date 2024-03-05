"use client";

import { Alert } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";

function SuccessAlert({ title, text, setShowSuccessAlert }) {
  useEffect(() => {
    setTimeout(() => setShowSuccessAlert(false), 2000);
  });

  return (
    <Alert title={title} icon={<IconCheck />} color="green">
      {text}
    </Alert>
  );
}

export default SuccessAlert;
