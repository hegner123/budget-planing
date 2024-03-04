import dayjs from "dayjs";
import { refreshDate, refreshDates } from "../hooks/forecast/lib/refresh";

const today = dayjs();
const testStartDate = "01/01/2023";
const thisMonth = dayjs().month();
const thisYear = dayjs().year();
const testDate = refreshDate(
  dayjs(testStartDate).month(thisMonth).year(thisYear).format("MM/DD/YYYY")
);

const testLength = 5;

const dailyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: testDate,
    repeated: "Daily",
    type: "expenses",
  },
];

const weeklyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Weekly",
    amount: 1,
    date: testDate,
    repeated: "Weekly",
    type: "expenses",
  },
];

const biWeeklyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    amount: 1,
    date: testDate,
    repeated: "Biweekly",
    type: "expenses",
  },
];

const monthlyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: testDate,
    repeated: "Monthly",
    type: "expenses",
  },
];

const yearlyEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Yearly",
    amount: 1,
    date: testDate,
    repeated: "Yearly",
    type: "expenses",
  },
];

const expenseTestEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: testDate,
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Weekly",
    amount: 1,
    date: testDate,
    repeated: "Weekly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    amount: 1,
    date: testDate,
    repeated: "Biweekly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: testDate,
    repeated: "Monthly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Yearly",
    amount: 1,
    date: testDate,
    repeated: "Yearly",
    type: "expenses",
  },
];

const incomeTestEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    amount: 100,
    date: testDate,
    repeated: "Biweekly",
    type: "income",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    amount: 100,
    date: dayjs(testDate).add(1, "week").format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "income",
  },
];

const expenseDateTestEntries = [
  {
    id: "ff1fd50c-aab8-4a5b-a63c-41c564855d4a",
    name: "Test Expense Biweekly",
    amount: 100,
    date: testDate,
    repeated: "Biweekly",
    type: "expense",
  },
  {
    id: "ff1fd50c-aab8-4a5b-a63c-41c564855d4a",
    name: "Test Expense Biweekly",
    amount: 100,
    date: dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "expense",
  },
];

const expectedIncomeTestEntries = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    amount: 100,
    date: testDate,
    repeated: "Biweekly",
    type: "income",
  },
];

const expectedExpenseTestEntries = [
  {
    id: "ff1fd50c-aab8-4a5b-a63c-41c564855d4a",
    name: "Test Expense Biweekly",
    amount: 100,
    date: testDate,
    repeated: "Biweekly",
    type: "expense",
  },
];

const incomePostRepeats = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    amount: 1,
    date: dayjs(testDate).format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "income",
    repeats: [
      dayjs(testDate).format("MM/DD/YYYY"),
      dayjs(testDate).add(2, "week").format("MM/DD/YYYY"),
      dayjs(testDate).add(4, "week").format("MM/DD/YYYY"),
      dayjs(testDate).add(6, "week").format("MM/DD/YYYY"),
    ],
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: dayjs(testDate).format("MM/DD/YYYY"),
    repeated: "Monthly",
    type: "income",
    repeats: [
      dayjs(testDate).format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(2, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(3, "month").format("MM/DD/YYYY"),
    ],
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
    repeated: "Monthly",
    type: "income",
    repeats: [
      dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "day").add(1, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "day").add(2, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "day").add(3, "month").format("MM/DD/YYYY"),
    ],
  },
];

const expectedIncomePostRepeats = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    amount: 1,
    date: dayjs(testDate).format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "income",
    repeats: [
      dayjs(testDate).format("MM/DD/YYYY"),
      dayjs(testDate).add(2, "week").format("MM/DD/YYYY"),
      dayjs(testDate).add(4, "week").format("MM/DD/YYYY"),
      dayjs(testDate).add(6, "week").format("MM/DD/YYYY"),
    ],
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: dayjs(testDate).format("MM/DD/YYYY"),
    repeated: "Monthly",
    type: "income",
    repeats: [
      dayjs(testDate).format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(2, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(3, "month").format("MM/DD/YYYY"),
    ],
  },
];
const expensesPostRepeats = [
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
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
    repeated: "Monthly",
    type: "expenses",
    repeats: [
      dayjs(testDate).add(1, "day").format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "day").add(1, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "day").add(2, "month").format("MM/DD/YYYY"),
      dayjs(testDate).add(1, "day").add(3, "month").format("MM/DD/YYYY"),
    ],
  },
];

const expectedExpensesPostRepeats = [
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

const forecastEntriesLong = [
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test balance",
    amount: 1000,
    date: dayjs("01/01/2020").format("MM/DD/YYYY"),
    type: "balance",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    amount: 100,
    date: testDate,
    repeated: "Biweekly",
    type: "income",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    amount: 100,
    date: dayjs(testDate).add(1, "week").format("MM/DD/YYYY"),
    repeated: "Biweekly",
    type: "income",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: testDate,
    repeated: "Daily",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Weekly",
    amount: 1,
    date: testDate,
    repeated: "Weekly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Biweekly",
    amount: 1,
    date: testDate,
    repeated: "Biweekly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Monthly",
    amount: 1,
    date: testDate,
    repeated: "Monthly",
    type: "expenses",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Yearly",
    amount: 1,
    date: testDate,
    repeated: "Yearly",
    type: "expenses",
  },
];

const forecastEntriesShort = [
    {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test balance",
    amount: 1000,
    date: dayjs("01/01/2020").format("MM/DD/YYYY"),
    type: "balance",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c564855d4a",
    name: "Test Income Biweekly",
    amount: 100,
    date: testDate,
    repeated: "Biweekly",
    type: "income",
  },
  {
    id: "ff1fd50c-aab8-4a4b-a63c-41c56485ad4a",
    name: "Test Daily",
    amount: 1,
    date: testDate,
    repeated: "Daily",
    type: "expenses",
  },
]


const expectedForecastEntries = "test";

const expectedIncomeTotal = 2;
const expectedExpenseTotal = 2;

export {
  testLength,
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
  expectedIncomeTotal,
  expectedExpenseTotal,
  incomePostRepeats,
  expensesPostRepeats,
  expectedIncomePostRepeats,
  expectedExpensesPostRepeats,
  forecastEntriesShort,
  forecastEntriesLong,
  expectedForecastEntries
};
