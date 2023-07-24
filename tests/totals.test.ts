// import {
//   createBalance,
//   refreshDate,
//   refreshDates,
//   repeatedEntries,
//   calcIncomeTotal,
//   calcExpenseTotal,
//   incomeDateFilter,
//   expenseDateFilter,
// } from "../hooks/forecast/lib";
// import { describe, expect, test } from "@jest/globals";
// import {
//   incomeTestEntries,
//   expenseTestEntries,
//   expectedIncomeTestEntries,
//   expectedExpenseTestEntries,
//   expectedIncomeTotal,
//   expectedExpenseTotal,
//   testDate,
// } from "./vars";
// import dayjs from "dayjs";

// describe("expenseTests", () => {
//   const incomeEntries = incomeDateFilter(incomeTestEntries, testDate);
//   const expenseEntries = expenseDateFilter(expenseTestEntries, testDate);
//   test("Test income date filter", () => {
//     expect(calcIncomeTotal(incomeEntries)).toStrictEqual(expectedIncomeTotal);
//   });
//   test("Test expense date filter", () => {
//     expect(calcExpenseTotal(expenseEntries)).toStrictEqual(
//       expectedExpenseTotal
//     );
//   });
// });
