import { refreshDates, refreshDate } from "../hooks/forecast/lib/refresh";
import { BudgetEntry } from "@budget/types";
import { describe, expect, test } from "@jest/globals";
import dayjs from "dayjs";

const entries: BudgetEntry[] = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: "01/01/2023",
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: "01/02/1999",
    repeated: "Daily",
    type: "expenses",
  },
];
const thisMonth = dayjs().month();
const thisYear = dayjs().year();
const refreshedEntries: BudgetEntry[] = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: `${thisMonth + 1}/01/${thisYear}`,
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: `${thisMonth + 1}/02/${thisYear}`,
    repeated: "Daily",
    type: "expenses",
  },
];

describe("refresh entries tests", () => {
  test("return refresh entry", () => {
    expect(refreshDate(entries[0].date)).toBe(refreshedEntries[0].date);
  });
  test("return refresh entries", () => {
    expect(refreshDates(entries)).toStrictEqual(refreshedEntries);
  });
});
