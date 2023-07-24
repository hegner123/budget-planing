import dayjs from "dayjs";
import { refreshDate, refreshDates } from "..//hooks/forecast/lib/refresh";

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

const expenseTestEntries = [
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

const incomeTestEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    expenses: "$100",
    date: testDate,
    repeated: "Biweekly",
    type: "income",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    expenses: "$100",
    date: dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "income",
  },
];

const expenseDateTestEntries = [
  {
    id: "ff1fd50c-aab8-4a5b-a63c-41c564855d4a",
    name: "Test Expense Biweekly",
    expenses: "$100",
    date: testDate,
    repeated: "Biweekly",
    type: "expense",
  },
  {
    id: "ff1fd50c-aab8-4a5b-a63c-41c564855d4a",
    name: "Test Expense Biweekly",
    expenses: "$100",
    date: dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "expense",
  },
];

const expectedIncomeTestEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    expenses: "$100",
    date: testDate,
    repeated: "Biweekly",
    type: "income",
  },
];
const expectedExpenseTestEntries = [
  {
    id: "ff1fd50c-aab8-4a5b-a63c-41c564855d4a",
    name: "Test Expense Biweekly",
    expenses: "$100",
    date: testDate,
    repeated: "Biweekly",
    type: "expense",
  },
];

export {
  testDate,
  dailyEntries,
  weeklyEntries,
  biWeeklyEntries,
  monthlyEntries,
  yearlyEntries,
  expenseTestEntries,
  incomeTestEntries,
  expenseDateTestEntries,
  expectedIncomeTestEntries,
  expectedExpenseTestEntries,
};
