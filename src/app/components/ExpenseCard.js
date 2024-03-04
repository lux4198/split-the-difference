"use client";
import { Badge, Card, Flex, useMantineTheme, Tooltip } from "@mantine/core";
import moment from "moment";
import { memberColors } from "@/app/lib/utils";
import MemberBadge from "./MemberBadge";

function ExpenseCard({ expense, members }) {
  const date = moment(expense.createdAt);
  const parsedDate = date.format("MMM Do YYYY");
  const payedByMember = members.find(
    (member) => member.id === expense.memberId,
  );
  return (
    <Card
      className={"m-auto mb-4 max-w-[500px] dark:text-white"}
      styles={{ root: { backgroundColor: "rgba(159, 203, 209, .3)" } }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Flex justify={"space-between"}>
        <h3 className="font-medium dark:text-white">{expense.name}</h3>
        <span className="text-gray-500 dark:text-white text-sm">
          {parsedDate}
        </span>
      </Flex>
      <Flex align={"baseline"} justify={"space-between"}>
        <Flex align={"baseline"}>
          <span className="text-start w-fit ml-1">
            <MemberBadge
              color={memberColors[payedByMember.id % memberColors.length]}
              name={payedByMember.name}
              className={"mr-2"}
            />
            payed:{" "}
          </span>
          <h1 className="ml-5 font-semibold text-[2.5rem] dark:text-white w-fit ">
            {expense.value}
          </h1>
          <span className="text-start w-fit ml-1">{expense.currency}</span>
        </Flex>
        <span className="ml-1">
          Shared by:{" "}
          {expense.membersSharing.map((member, idx) => (
            <MemberBadge
              key={"cardBadge" + member.name + member.id}
              color={memberColors[member.id % memberColors.length]}
              name={member.name}
              className={"mr-1"}
            />
          ))}
        </span>
      </Flex>
    </Card>
  );
}

export default ExpenseCard;
