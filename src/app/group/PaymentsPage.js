"use client";

import { useAtomValue } from "jotai";
import { expensesAtom, viewMemberAtomWithPersistence } from "./groupAtoms";
import { IconCreditCardPay } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import PaymentCard from "../components/PaymentCard";
import { getMemberByID } from "./selectors";
import moment from "moment";

function PaymentsPage({ toggleExpenseInput, members }) {
  const viewMember = useAtomValue(viewMemberAtomWithPersistence);
  const expenses = useAtomValue(expensesAtom);
  const payments = expenses
    ? expenses.filter(({ type }) => type === "payment")
    : [];
  return (
    <>
      {members && (
        <div className="mt-2 mb-5">
          <Button
            rightSection={<IconCreditCardPay size={14} />}
            onClick={toggleExpenseInput}
          >
            Make a Payment
          </Button>
        </div>
      )}
      {payments.length > 0 ? (
        payments
          .filter(
            (payment) =>
              payment.memberId === viewMember.id ||
              payment.membersSharing[0].id === viewMember.id,
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((payment) => (
            <PaymentCard
              memberFrom={getMemberByID(members, payment.memberId)}
              memberTo={payment.membersSharing[0]}
              value={payment.value}
              date={payment.createdAt}
              currency={payment.currency}
              positive={payment.memberId !== viewMember.id}
            />
          ))
      ) : (
        <div>No payments available.</div>
      )}
    </>
  );
}

export default PaymentsPage;
