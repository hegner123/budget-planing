// import {
//   createBalance,
//   refreshDate,
//   refreshDates,
//   repeatedEntries,
//   incomeDateFilter,
//   expenseDateFilter,
//   mapIncomeData,
//   mapExpenseData,
// } from "../hooks/forecast/lib";
// import { describe, expect, test } from "@jest/globals";
// import {
//   incomeTestEntries,
//   expenseTestEntries,
//   expectedIncomeTotal,
//   expectedExpenseTotal,
//   testDate,
// } from "./vars";
// import dayjs from "dayjs";

// describe("expenseTests", () => {
//   const freshIncome = refreshDates(incomeTestEntries);
//   const freshExpenses = refreshDates(expenseTestEntries);

//   const repeatedIncome = repeatedEntries(freshIncome, length);
//   const repeatedExpenses = repeatedEntries(freshExpenses, length);

//   test("Test income date filter", () => {
//     expect(mapIncomeData(repeatedIncome)).toStrictEqual(expectedIncomeTotal);
//   });
//   test("Test expense date filter", () => {
//     expect(mapExpenseData(repeatedExpenses)).toStrictEqual(
//       expectedExpenseTotal
//     );
//   });
// });
