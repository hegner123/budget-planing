import {
  createBalance,
  refreshDate,
  refreshDates,
  repeatedEntries,
  dateFilter,
} from "../hooks/forecast/lib";
import { describe, expect, test } from "@jest/globals";
import {
  incomePostRepeats,
  expensesPostRepeats,
  expectedIncomePostRepeats,
  expectedExpensesPostRepeats,
  testDate,
} from "./vars";
import dayjs from "dayjs";

describe("expenseTests", () => {
  test("Test income date filter", () => {
    expect(dateFilter(incomePostRepeats, testDate)).toStrictEqual(
      expectedIncomePostRepeats
    );
  });
  test("Test expense date filter", () => {
    expect(dateFilter(expensesPostRepeats, testDate)).toStrictEqual(
      expectedExpensesPostRepeats
    );
  });
});
