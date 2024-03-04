import dayjs from "dayjs";

const thisMonth = dayjs(new Date()).month();
const thisYear = dayjs(new Date()).year();
const month = dayjs(thisMonth).format("MM");
const year = dayjs(thisYear).format("YYYY");

const expectedForecast = [
  {
    date: `${month}/02/${year}`,
    balance: 1099,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 1099,
      incomesTotal: 100,
      incomes: [
        { name: "Test Income Biweekly", amount: 100, repeated: "Biweekly" },
      ],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/03/${year}`,
    balance: 1098,
    balanceDetails: {
      previousBalance: 1099,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
];

const expectedForecastLong = [
  {
    date: `${month}/02/${year}`,
    balance: 1000,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/03/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/04/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/05/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/06/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/07/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/08/${year}`,
    balance: 1098,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 1098,
      incomesTotal: 100,
      incomes: [
        { name: "Test Income Biweekly", amount: 100, repeated: "Biweekly" },
      ],
      expensesTotal: 2,
      expenses: [
        { name: "Test Daily", amount: 1, repeated: "Daily" },
        { name: "Test Weekly", amount: 1, repeated: "Weekly" },
      ],
    },
  },
  {
    date: `${month}/09/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/10/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/11/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/12/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/13/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/14/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/15/${year}`,
    balance: 1097,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 1097,
      incomesTotal: 100,
      incomes: [
        { name: "Test Income Biweekly", amount: 100, repeated: "Biweekly" },
      ],
      expensesTotal: 3,
      expenses: [
        { name: "Test Daily", amount: 1, repeated: "Daily" },
        { name: "Test Weekly", amount: 1, repeated: "Weekly" },
        { name: "Test Biweekly", amount: 1, repeated: "Biweekly" },
      ],
    },
  },
  {
    date: `${month}/16/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/17/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/18/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/19/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/20/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/21/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/22/${year}`,
    balance: 1098,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 1098,
      incomesTotal: 100,
      incomes: [
        { name: "Test Income Biweekly", amount: 100, repeated: "Biweekly" },
      ],
      expensesTotal: 2,
      expenses: [
        { name: "Test Daily", amount: 1, repeated: "Daily" },
        { name: "Test Weekly", amount: 1, repeated: "Weekly" },
      ],
    },
  },
  {
    date: `${month}/23/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/24/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/25/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/26/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/27/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/28/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/29/${year}`,
    balance: 1097,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 1097,
      incomesTotal: 100,
      incomes: [
        { name: "Test Income Biweekly", amount: 100, repeated: "Biweekly" },
      ],
      expensesTotal: 3,
      expenses: [
        { name: "Test Daily", amount: 1, repeated: "Daily" },
        { name: "Test Weekly", amount: 1, repeated: "Weekly" },
        { name: "Test Biweekly", amount: 1, repeated: "Biweekly" },
      ],
    },
  },
  {
    date: `${month}/30/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
  {
    date: `${month}/31/${year}`,
    balance: 999,
    balanceDetails: {
      previousBalance: 1000,
      newBalance: 999,
      incomesTotal: 0,
      incomes: [],
      expensesTotal: 1,
      expenses: [{ name: "Test Daily", amount: 1, repeated: "Daily" }],
    },
  },
];

export { expectedForecast, expectedForecastLong };
