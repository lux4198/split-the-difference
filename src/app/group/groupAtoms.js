"use client";

import { atom } from "jotai";

const groupInfoAtom = atom(null);
const groupIdAtom = atom((get) => {
  const groupInfo = get(groupInfoAtom);
  if (groupInfo) return groupInfo.id;
});
const groupBaseCurrAtom = atom((get) => {
  const groupInfo = get(groupInfoAtom);
  if (groupInfo) return groupInfo.baseCurrency;
});
const membersAtom = atom(null);
const expensesAtom = atom(null);
const paymentsAtom = atom(null);

const viewMemberAtom = atom(localStorage.getItem("viewMember") ?? null);

const viewMemberAtomWithPersistence = atom(
  (get) => get(viewMemberAtom),
  (get, set, newStr) => {
    set(viewMemberAtom, newStr);
    localStorage.setItem("viewMember", newStr);
  },
);

export {
  groupInfoAtom,
  groupIdAtom,
  groupBaseCurrAtom,
  membersAtom,
  expensesAtom,
  paymentsAtom,
  viewMemberAtom,
  viewMemberAtomWithPersistence,
};
