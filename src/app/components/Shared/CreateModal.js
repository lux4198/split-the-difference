"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Overlay, CloseButton, Card } from "@mantine/core";

function CreateModal({ opened, close, children, modalRef, withClose = true }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted &&
    createPortal(
      <>
        {opened && (
          <Overlay
            style={{ zIndex: "10", position: "fixed" }}
            color="#000"
            backgroundOpacity={0.87}
          />
        )}
        <div
          ref={modalRef}
          className={
            `m-auto inset-0 w-fit max-w-[700px] fixed h-fit z-20 p-10 rounded-sm ` +
            (opened ? "visible" : "invisible")
          }
        >
          <Card style={{ padding: "1.5rem" }}>
            {withClose && (
              <div className={"absolute top-0 right-0 "}>
                <CloseButton aria-label="Close modal" onClick={close} />
              </div>
            )}
            {children}
          </Card>
        </div>
      </>,
      document.body,
    )
  );
}

export default CreateModal;
