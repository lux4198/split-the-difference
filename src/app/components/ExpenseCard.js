"use client";
import {
  Badge,
  Card,
  Flex,
  useMantineTheme,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import moment from "moment";
import { memberColors } from "@/app/lib/utils";
import MemberBadge from "./MemberBadge";
import { IconUsersGroup, IconEdit, IconTrash } from "@tabler/icons-react";
import CreateModal from "./CreateModal";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import ExpenseDeleteForm from "./inputComponents/expense/expenseDeleteForm";
import ExpenseEditForm from "./inputComponents/expense/expenseEditForm";
import { useEscClose } from "../hooks";

function ExpenseCard({
  expense,
  members,
  setShowSuccessAlert,
  setSuccessAlertTitle,
}) {
  const [opened, { close, toggle, open }] = useDisclosure(false);
  const modalRef = useRef(null);
  const date = moment(expense.createdAt);
  const parsedDate = date.format("MMM Do YYYY");
  const payedByMember = members.find(
    (member) => member.id === expense.memberId,
  );
  const [action, setAction] = useState("");
  const [editFormActive, setEditFormActive] = useState(false);
  useEscClose(opened, close);
  return (
    <Card
      className={"m-auto mb-4 dark:text-white"}
      styles={{ root: { backgroundColor: "rgba(159, 203, 209, .3)" } }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Flex justify={"space-between"} align={"center"}>
        <h3 className="font-medium dark:text-white">{expense.name}</h3>
        <Flex align={"center"}>
          <span className="text-gray-500 dark:text-white text-sm">
            {parsedDate}
          </span>
          <ActionIcon
            size={"sm"}
            className="ml-2"
            onClick={() => {
              open();
              setAction("edit");
            }}
          >
            <IconEdit size={17} />
          </ActionIcon>
          <ActionIcon
            size={"sm"}
            className="ml-2"
            color="red"
            onClick={() => {
              open();
              setAction("delete");
            }}
          >
            <IconTrash size={17} />
          </ActionIcon>
        </Flex>
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
      </Flex>
      <div className="ml-1">
        Shared by:{" "}
        {expense.membersSharing.map((member, idx) => (
          <MemberBadge
            key={"cardBadge" + member.name + member.id}
            color={memberColors[member.id % memberColors.length]}
            name={member.name}
            className={"mr-1"}
          />
        ))}
        {expense.membersSharing.length === members.length && (
          <span className="ml-2">(All)</span>
        )}
      </div>
      {opened && (
        <CreateModal close={close} opened={opened}>
          {action === "edit" ? (
            <ExpenseEditForm
              expense={expense}
              setFormActive={setEditFormActive}
              close={close}
              setShowSuccessAlert={setShowSuccessAlert}
              setSuccessAlertTitle={setSuccessAlertTitle}
            />
          ) : (
            action === "delete" && (
              <ExpenseDeleteForm
                closeModal={close}
                expenseId={expense.id}
                expenseName={expense.name}
                setShowSuccessAlert={setShowSuccessAlert}
                setSuccessAlertTitle={setSuccessAlertTitle}
              />
            )
          )}
        </CreateModal>
      )}
    </Card>
  );
}

export default ExpenseCard;
