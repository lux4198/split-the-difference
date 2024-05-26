import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Expense = {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  name: string | null;
  type: string | null;
  value: number;
  currency: string;
  groupId: number;
  memberId: number;
};
export type Group = {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  name: string;
  password: string;
  email: string;
  baseCurrency: Generated<string>;
};
export type Member = {
  id: Generated<number>;
  name: string;
  groupId: number;
};
export type MemberExpensesShared = {
  A: number;
  B: number;
};
export type Payment = {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  value: number;
  currency: Generated<string>;
  fromId: number;
  toId: number;
  groupId: number;
};
export interface DB {
  _MemberExpensesShared: MemberExpensesShared;
  Expense: Expense;
  Group: Group;
  Member: Member;
  Payment: Payment;
}
