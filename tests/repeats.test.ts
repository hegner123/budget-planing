import { refreshDate, refreshDates } from "..//hooks/forecast/lib/refresh";
import { repeatedEntries } from "../hooks/forecast/lib/repeats";
import { describe, expect, test } from "@jest/globals";
import dayjs from "dayjs";

const today = dayjs();
const testStartDate = "01/01/2023";
const thisMonth = dayjs().month();
const thisYear = dayjs().year();
const testDate = refreshDate(
  dayjs(testStartDate).month(thisMonth).year(thisYear).format("MM/DD/YYYY")
);

const dailyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    expenses: "$1",
    date: testDate,
    repeated: "Daily",
    type: "expenses",
  },
];

const weeklyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Weekly",
    expenses: "$1",
    date: testDate,
    repeated: "Weekly",
    type: "expenses",
  },
];

const biWeeklyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    expenses: "$1",
    date: testDate,
    repeated: "Biweekly",
    type: "expenses",
  },
];

const monthlyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    expenses: "$1",
    date: testDate,
    repeated: "Monthly",
    type: "expenses",
  },
];

const yearlyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Yearly",
    expenses: "$1",
    date: testDate,
    repeated: "Yearly",
    type: "expenses",
  },
];

describe("repeatedEntries", () => {
  test("return repeated entries for 3 daily repeats", () => {
    const dailyExpected = [
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
    const weeklyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Weekly",
        expenses: "$1",
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Weekly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Weekly",
        expenses: "$1",
        date: dayjs(testDate).add(1, "week").format("MM/DD/YYYY"),
        repeated: "Weekly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Weekly",
        expenses: "$1",
        date: dayjs(testDate).add(2, "week").format("MM/DD/YYYY"),
        repeated: "Weekly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Weekly",
        expenses: "$1",
        date: dayjs(testDate).add(3, "week").format("MM/DD/YYYY"),
        repeated: "Weekly",
        type: "expenses",
      },
    ];
    const biWeeklyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Biweekly",
        expenses: "$1",
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Biweekly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Biweekly",
        expenses: "$1",
        date: dayjs(testDate).add(2, "week").format("MM/DD/YYYY"),
        repeated: "Biweekly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Biweekly",
        expenses: "$1",
        date: dayjs(testDate).add(4, "week").format("MM/DD/YYYY"),
        repeated: "Biweekly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Biweekly",
        expenses: "$1",
        date: dayjs(testDate).add(6, "week").format("MM/DD/YYYY"),
        repeated: "Biweekly",
        type: "expenses",
      },
    ];
    const monthlyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Monthly",
        expenses: "$1",
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Monthly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Monthly",
        expenses: "$1",
        date: dayjs(testDate).add(1, "month").format("MM/DD/YYYY"),
        repeated: "Monthly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Monthly",
        expenses: "$1",
        date: dayjs(testDate).add(2, "month").format("MM/DD/YYYY"),
        repeated: "Monthly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Monthly",
        expenses: "$1",
        date: dayjs(testDate).add(3, "month").format("MM/DD/YYYY"),
        repeated: "Monthly",
        type: "expenses",
      },
    ];
    const yearlyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Yearly",
        expenses: "$1",
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Yearly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Yearly",
        expenses: "$1",
        date: dayjs(testDate).add(1, "year").format("MM/DD/YYYY"),
        repeated: "Yearly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Yearly",
        expenses: "$1",
        date: dayjs(testDate).add(2, "year").format("MM/DD/YYYY"),
        repeated: "Yearly",
        type: "expenses",
      },
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Yearly",
        expenses: "$1",
        date: dayjs(testDate).add(3, "year").format("MM/DD/YYYY"),
        repeated: "Yearly",
        type: "expenses",
      },
    ];

    function refreshSwitch(entries) {
      switch (entries[0].repeated) {
        case "Daily":
          return refreshDates(entries);
        case "Weekly":
          return refreshDates(entries);
        case "Biweekly":
          return refreshDates(entries);
        case "Monthly":
          return refreshDates(entries);
        case "Yearly":
          return refreshDates(entries);
        default:
          return entries;
      }
    }
    function repeatedSwitch(entries) {
      switch (entries[0].repeated) {
        case "Daily":
          return repeatedEntries(entries, 3, "daily");
        case "Weekly":
          return repeatedEntries(entries, 3 * 7, "weekly");
        case "Biweekly":
          return repeatedEntries(entries, 3 * 14, "biweekly");
        case "Monthly":
          return repeatedEntries(entries, 3 * 30, "monthly");
        case "Yearly":
          return repeatedEntries(entries, 3 * 365, "yearly");
        default:
          return entries;
      }
    }

    expect(JSON.stringify(repeatedSwitch(refreshDates(dailyEntries)))).toBe(
      JSON.stringify(dailyExpected)
    );
    expect(JSON.stringify(repeatedSwitch(refreshDates(weeklyEntries)))).toBe(
      JSON.stringify(weeklyExpected)
    );
    expect(JSON.stringify(repeatedSwitch(refreshDates(biWeeklyEntries)))).toBe(
      JSON.stringify(biWeeklyExpected)
    );
    expect(JSON.stringify(repeatedSwitch(refreshDates(monthlyEntries)))).toBe(
      JSON.stringify(monthlyExpected)
    );
    expect(JSON.stringify(repeatedSwitch(refreshDates(yearlyEntries)))).toBe(
      JSON.stringify(yearlyExpected)
    );
  });
});
