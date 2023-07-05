import { repeatedEntries } from "../hooks/forecast/lib/repeats";
import { describe, expect, test } from "@jest/globals";
import dayjs from "dayjs";

const today = dayjs();
const testStartDate = "01/01/2023";
const thisMonth = dayjs().month();
const thisYear = dayjs().year();
const testDate = dayjs(testStartDate)
  .month(thisMonth)
  .year(thisYear)
  .format("MM/DD/YYYY");

const entries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    expenses: "$1",
    date: testDate,
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Weekly",
    expenses: "$1",
    date: testDate,
    repeated: "Weekly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    expenses: "$1",
    date: testDate,
    repeated: "Biweekly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    expenses: "$1",
    date: testDate,
    repeated: "Monthly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Yearly",
    expenses: "$1",
    date: testDate,
    repeated: "Yearly",
    type: "expenses",
  },
];

const DailyRepeatedEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    expenses: "$1",
    date: dayjs(testDate).format("MM/DD/YYYY"),
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    expenses: "$1",
    date: dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    expenses: "$1",
    date: dayjs(testDate).add(2, "day").format("MM/DD/YYYY"),
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    expenses: "$1",
    date: dayjs(testDate).add(3, "day").format("MM/DD/YYYY"),
    repeated: "Daily",
    type: "expenses",
  },
];

describe("repeatedEntries", () => {
  test("return repeated entries for 3 daily repeats", () => {
    expect(repeatedEntries(entries, 3)).toStrictEqual(DailyRepeatedEntries);
  });
});
