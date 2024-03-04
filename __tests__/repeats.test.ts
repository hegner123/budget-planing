import { refreshDate, refreshDates } from "../hooks/forecast/lib/refresh";
import { repeatedEntries } from "../hooks/forecast/lib/repeats";
import { describe, expect, test } from "@jest/globals";
import {
  testDate,
  dailyEntries,
  weeklyEntries,
  biWeeklyEntries,
  monthlyEntries,
  yearlyEntries,
} from "./vars";
import dayjs from "dayjs";

describe("repeatedEntries", () => {
  test("return repeated entries for all supported lengths of repeated entries", () => {
    const dailyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Daily",
        amount: 1,
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Daily",
        type: "expenses",
        repeats: [
          dayjs(testDate).format("MM/DD/YYYY"),
          dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
          dayjs(testDate).add(2, "day").format("MM/DD/YYYY"),
          dayjs(testDate).add(3, "day").format("MM/DD/YYYY"),
        ],
      },
    ];

    const weeklyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Weekly",
        amount: 1,
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Weekly",
        type: "expenses",
        repeats: [
          dayjs(testDate).format("MM/DD/YYYY"),
          dayjs(testDate).add(1, "week").format("MM/DD/YYYY"),
          dayjs(testDate).add(2, "week").format("MM/DD/YYYY"),
          dayjs(testDate).add(3, "week").format("MM/DD/YYYY"),
        ],
      },
    ];

    const biWeeklyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Biweekly",
        amount: 1,
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Biweekly",
        type: "expenses",
        repeats: [
          dayjs(testDate).format("MM/DD/YYYY"),
          dayjs(testDate).add(2, "week").format("MM/DD/YYYY"),
          dayjs(testDate).add(4, "week").format("MM/DD/YYYY"),
          dayjs(testDate).add(6, "week").format("MM/DD/YYYY"),
        ],
      },
    ];

    const monthlyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Monthly",
        amount: 1,
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Monthly",
        type: "expenses",
        repeats: [
          dayjs(testDate).format("MM/DD/YYYY"),
          dayjs(testDate).add(1, "month").format("MM/DD/YYYY"),
          dayjs(testDate).add(2, "month").format("MM/DD/YYYY"),
          dayjs(testDate).add(3, "month").format("MM/DD/YYYY"),
        ],
      },
    ];

    const yearlyExpected = [
      {
        id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
        name: "Test Yearly",
        amount: 1,
        date: dayjs(testDate).format("MM/DD/YYYY"),
        repeated: "Yearly",
        type: "expenses",
        repeats: [
          dayjs(testDate).format("MM/DD/YYYY"),
          dayjs(testDate).add(1, "year").format("MM/DD/YYYY"),
          dayjs(testDate).add(2, "year").format("MM/DD/YYYY"),
          dayjs(testDate).add(3, "year").format("MM/DD/YYYY"),
        ],
      },
    ];

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
