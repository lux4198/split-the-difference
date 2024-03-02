"use client";
import { Badge, Card, Flex, useMantineTheme, Tooltip } from "@mantine/core";
import moment from "moment";

function ExpenseCard({ expense, members }) {
  const theme = useMantineTheme();
  const colors = Object.keys(theme.colors).slice(2);

  const date = moment(expense.createdAt);
  const parsedDate = date.format("MMM Do YYYY");
  const payedByMember = members.find(
    (member) => member.id === expense.memberId,
  );
  return (
    <Card
      className={"m-auto mb-4 max-w-[500px] dark:text-white"}
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
            {payedByMember.name} payed:{" "}
          </span>
          <h1 className="ml-5 font-semibold text-[2.5rem] text-gray-600 dark:text-white w-fit ">
            {expense.value}
          </h1>
          <span className="text-start w-fit ml-1">{expense.currency}</span>
        </Flex>
        <span className="ml-1">
          Shared by:{" "}
          {expense.membersSharing.map((member, idx) => (
            <Tooltip key={"ExpenseMemberBadge" + member.id} label={member.name}>
              <Badge
                variant="filled"
                className="ml-1"
                circle
                color={colors[idx % colors.length]}
              >
                {member.name.slice(0, 2)}
              </Badge>
            </Tooltip>
          ))}
        </span>
      </Flex>
    </Card>
  );
}

export default ExpenseCard;
