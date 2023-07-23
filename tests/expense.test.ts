import { refreshDate, refreshDates } from "../hooks/forecast/lib/refresh";
import { repeatedEntries } from "../hooks/forecast/lib/repeats";
import { describe, expect, test } from "@jest/globals";
import createBalance from "@budget/hooks/forecast/lib/createBalance";
import {
  incomeDateFilter,
  expenseDateFilter,
} from "@budget/hooks/forecast/lib/dateFilter";
import {
  incomeTestEntries,
  expenseTestEntries,
  testDate,
} from "./placeholders";
import dayjs from "dayjs";

describe("expenseTests", () => {
  test("Test expense date filter", () => {
    expect(incomeDateFilter(incomeTestEntries, testDate)).toBe(1);
  });
});
