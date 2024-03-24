"use client";

import { atom, useAtomValue } from "jotai";
import { calculateNetOwes } from "../lib/calcUtils";

const groupInfoAtom = atom(null);
const groupIdAtom = atom((get) => {
  const groupInfo = get(groupInfoAtom);
  if (groupInfo) return groupInfo.id;
});
const groupBaseCurrAtom = atom((get) => {
  const groupInfo = get(groupInfoAtom);
  if (groupInfo) return groupInfo.baseCurrency;
});

const ratesAtom = atom(async (get) => {
  const baseCurr = get(groupBaseCurrAtom);
  if (baseCurr) {
    const rates = await fetchRates(baseCurr);
    return rates;
  }
});

const fetchRates = async (baseCurr) => {
  const result = await fetch(`https://open.er-api.com/v6/latest/${baseCurr}`);
  return await result.json();
};

const membersAtom = atom(null);

const expensesAtom = atom(null);
const transactionsAtom = atom((get) => {
  const expenses = get(expensesAtom);
  if (expenses) {
    return expenses
      .map((expense) =>
        expense.membersSharing.map((member) => [
          expense.memberId,
          member.id,
          expense.value,
          expense.currency,
        ]),
      )
      .flat();
  }
});
const netOwesAtom = atom(async (get) => {
  const transactions = get(transactionsAtom);
  const rates = await get(ratesAtom);
  if (transactions && rates && rates.rates) {
    return calculateNetOwes(transactions, rates.rates);
  }
});
const paymentsAtom = atom(null);

const viewMemberAtom = atom(
  localStorage.getItem("viewMember") != null
    ? JSON.parse(localStorage.getItem("viewMember"))
    : null,
);

const viewMemberAtomWithPersistence = atom(
  (get) => get(viewMemberAtom),
  (get, set, newStr) => {
    set(viewMemberAtom, newStr);
    localStorage.setItem("viewMember", JSON.stringify(newStr));
  },
);

export {
  groupInfoAtom,
  groupIdAtom,
  groupBaseCurrAtom,
  membersAtom,
  expensesAtom,
  transactionsAtom,
  netOwesAtom,
  paymentsAtom,
  viewMemberAtom,
  viewMemberAtomWithPersistence,
  ratesAtom,
};
