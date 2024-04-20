import { Badge, Card, Popover } from "@mantine/core";
import React, { useState } from "react";
import MemberBadge from "./MemberBadge";
import { memberColors } from "../lib/utils";
import { IconArrowRight, IconArrowRightToArc } from "@tabler/icons-react";
import moment from "moment";

function PaymentCard({
  memberFrom,
  memberTo,
  value,
  date,
  currency,
  positive,
}) {
  const parsedDate = moment(date).format("MMM Do");
  const parsedDateHour = moment(date).format("MMM Do YYYY HH:MM");
  const [datePopover, showDatePopover] = useState(false);
  return (
    <Card
      className={"mb-4 dark:text-white max-w-[400px]"}
      styles={{ root: { backgroundColor: "rgba(159, 203, 209, .3)" } }}
      withBorder
      shadow="sm"
      padding="0"
      radius="md"
    >
      <div className="flex flex-col w-full p-5 pt-0">
        <Popover opened={datePopover} position="right" withArrow>
          <Popover.Target>
            <span
              className={"text-xs pt-2 mb-2 w-fit"}
              onMouseEnter={() => showDatePopover(true)}
              onMouseLeave={() => showDatePopover(false)}
            >
              {parsedDate}
            </span>
          </Popover.Target>
          <Popover.Dropdown>
            <span className="text-xs w-fit">{parsedDateHour}</span>
          </Popover.Dropdown>
        </Popover>
        <div className="flex items-center h-full w-full justify-between">
          <div className="flex items-center gap-3">
            <MemberBadge
              size="xl"
              name={memberFrom.name}
              color={memberColors[memberFrom.id % memberColors.length]}
            />
            <IconArrowRight />
            <MemberBadge
              size="xl"
              name={memberTo.name}
              color={memberColors[memberTo.id % memberColors.length]}
            />
          </div>
          <div className="font-semibold flex items-center gap-2">
            {positive ? (
              <Badge size="sm" circle color="green">
                +
              </Badge>
            ) : (
              <Badge size="sm" circle color="red">
                -
              </Badge>
            )}
            {value} {currency}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PaymentCard;
