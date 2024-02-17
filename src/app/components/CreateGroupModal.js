"use client";

import React from "react";
import { createPortal } from "react-dom";
import { Overlay, CloseButton, useMantineTheme, Card } from "@mantine/core";

function CreateGroupModal({ opened, close, children, modalRef }) {
  return createPortal(
    <>
      {opened && (
        <Overlay
          style={{ zIndex: "10" }}
          color="#000"
          backgroundOpacity={0.85}
        />
      )}
      <div
        ref={modalRef}
        className={
          `m-auto inset-0 w-fit fixed h-fit z-20 p-10 rounded-sm ` +
          (opened ? "visible" : "invisible")
        }
      >
        <Card style={{ padding: "1.5rem" }}>
          <div className={"absolute top-0 right-0 "}>
            <CloseButton aria-label="Close modal" onClick={close} />
          </div>
          {children}
        </Card>
      </div>
    </>,
    document.body,
  );
}

export default CreateGroupModal;
