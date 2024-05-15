"use client";

import MemberBadge from "@/app/components/MemberBadge";
import { getSumOfArray, roundToDigit } from "@/app/lib/calcUtils";
import { currencyData } from "@/app/lib/currencyData";
import { memberColors } from "@/app/lib/utils";
import React from "react";
import { useAtomValue } from "jotai";
import { netOwesAtom, viewMemberAtom, groupBaseCurrAtom } from "./groupAtoms";
import { getMemberByID } from "./selectors";
import { ActionIcon, Badge, Button } from "@mantine/core";
import { IconCreditCardPay } from "@tabler/icons-react";
import HoverPopover from "@/app/components/Shared/HoverPopover";

function BalancePage({ members, toggleExpenseInput, setExpenseCreateDefault }) {
  const netOwes = useAtomValue(netOwesAtom);
  const viewMember = useAtomValue(viewMemberAtom);
  const baseCurr = useAtomValue(groupBaseCurrAtom);
  let viewMemberBalance, totalOwed, totalOwe;
  if (netOwes && viewMember) {
    viewMemberBalance = netOwes[viewMember.id];
    totalOwe = Math.abs(
      getSumOfArray(Object.values(viewMemberBalance).filter((val) => val < 0)),
    );
    totalOwed = Math.abs(
      getSumOfArray(Object.values(viewMemberBalance).filter((val) => val > 0)),
    );
  }
  console.log(netOwes);

  return (
    <>
      {members && viewMemberBalance && (
        <>
          <div className="w-full p-5 pb-0 border-solid border-0 border-b-2 dark:border-white border-black">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col w-fit gap-1">
                {Object.keys(viewMemberBalance)
                  .filter((id) => viewMemberBalance[id] < 0)
                  .map((id, idx) => {
                    const value = viewMemberBalance[id];
                    return (
                      value && (
                        <div
                          key={"balanceowed" + idx}
                          className="flex justify-between items-center gap-5 w-full"
                        >
                          <div className="flex gap-3">
                            <Badge size="sm" circle color="red">
                              -
                            </Badge>
                            You owe {Math.abs(value)}{" "}
                            {currencyData[baseCurr].symbol} to
                            <MemberBadge
                              name={getMemberByID(members, id).name}
                              color={memberColors[id % memberColors.length]}
                            />
                          </div>
                          <HoverPopover
                            content={
                              <span className="text-xs">Settle Debt</span>
                            }
                          >
                            <ActionIcon
                              size="sm"
                              onClick={() => {
                                toggleExpenseInput();
                                setExpenseCreateDefault({
                                  sharedBy: [getMemberByID(members, id)],
                                  value: Math.abs(value),
                                });
                              }}
                            >
                              <IconCreditCardPay strokeWidth={1.7} />
                            </ActionIcon>
                          </HoverPopover>
                        </div>
                      )
                    );
                  })}
              </div>
              <div className="flex flex-col pb-2">
                {Object.keys(viewMemberBalance)
                  .filter((id) => viewMemberBalance[id] > 0)
                  .map((id, idx) => {
                    const value = viewMemberBalance[id];
                    return (
                      value && (
                        <div
                          key={"balancepayed" + idx}
                          className="flex items-center gap-2"
                        >
                          <Badge size="sm" circle color="green">
                            +
                          </Badge>
                          You get {value} {currencyData[baseCurr].symbol} from{" "}
                          <MemberBadge
                            name={getMemberByID(members, id).name}
                            color={memberColors[id % memberColors.length]}
                          />
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
          {totalOwe !== 0 && (
            <div className="flex items-center gap-2 pt-2">
              <Badge size="sm" circle color="red">
                -
              </Badge>{" "}
              You owe {roundToDigit(totalOwe, 2)}{" "}
              {currencyData[baseCurr].symbol} in total.
            </div>
          )}
          {totalOwed !== 0 && (
            <div className="flex items-center gap-2 pt-2">
              <Badge size="sm" circle color="green">
                +
              </Badge>{" "}
              You're owed {roundToDigit(totalOwed, 2)}{" "}
              {currencyData[baseCurr].symbol} in total.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default BalancePage;
