import { Tabs } from "@mantine/core";
import React from "react";

function SideNav({ className }) {
  return (
    <div
      className={
        "items-stretch border-solid border-0 border-r-[1px] border-gray-300 " +
        className
      }
    >
      <Tabs defaultValue="expenses">
        <Tabs.List className="pt-12">
          <Tabs.Tab value="expenses">Expenses</Tabs.Tab>
          <Tabs.Tab value="balance">Balance</Tabs.Tab>
          <Tabs.Tab value="payments">Payments</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
}

export default SideNav;
