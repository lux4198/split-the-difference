import { Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCreditCard,
  IconMoneybag,
  IconScale,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";

const SideNavTab = ({ value, children }) => {
  return (
    <Tabs.Tab value={value}>
      <div className="flex items-center p-0 pt-2 md:p-2">{children}</div>
    </Tabs.Tab>
  );
};

function SideNav({ className, navSelected, setNavSelected }) {
  const isDesktop = useMediaQuery("(min-width : 768px)");
  const isMobile = useMediaQuery("(max-width : 440px)");
  return (
    <div
      className={
        "items-stretch border-solid border-0 border-r-[1px] border-gray-300 box-border " +
        "w-full md:w-[20%] " +
        className
      }
    >
      <Tabs
        value={navSelected}
        onChange={setNavSelected}
        defaultValue="expenses"
        orientation={isDesktop ? "vertical" : "horizontal"}
      >
        <Tabs.List className="ml-auto" justify={isDesktop ? "" : "center"}>
          <SideNavTab value="expenses">
            <IconMoneybag className={!isMobile && "mr-2"} />{" "}
            {!isMobile && "Expenses"}
          </SideNavTab>
          <SideNavTab value="balance">
            <IconScale className={!isMobile && "mr-2"} />{" "}
            {!isMobile && "Balance"}
          </SideNavTab>
          <SideNavTab value="payments">
            <IconCreditCard className={!isMobile && "mr-2"} />{" "}
            {!isMobile && "Payments"}
          </SideNavTab>
          <SideNavTab value="settings">
            <IconSettings className={!isMobile && "mr-2"} />{" "}
            {!isMobile && "Settings"}
          </SideNavTab>
        </Tabs.List>
      </Tabs>
    </div>
  );
}

export default SideNav;
