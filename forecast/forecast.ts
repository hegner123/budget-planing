import dayjs from "dayjs";
export class BudgetForecast {
  constructor(length: number, startDate: string, data: any) {
    this.length = length;
    this.startDate = startDate;
    this.data = data;
  }
  getForecast() {
    console.log(this.data);
    // Init forecastList

    let forecastList = [];

    // Filter compiled data into balance, income, and expenses

    const balance = this.data.filter((entry: any) => entry.type === "balance");
    const income = this.data.filter((entry: any) => entry.type === "income");
    const expenses = this.data.filter(
      (entry: any) => entry.type === "expenses"
    );

    // Balance Length

    const balanceLength = balance.length;

    // Assign most recent balance
    console.log(balance);
    console.log(balanceLength);
    let startingBalance = trimAndFloat(balance[balanceLength - 1]?.balance);

    // Assign starting date
    const startDateDayjs = dayjs(this.startDate);

    for (let i = 0; i < this.length; i++) {
      let newDate = startDateDayjs.add(i, "day");
      let newBalance = startingBalance;

      if (i >= 1) {
        newBalance = calculateBalance(
          forecastList[i - 1].balance,
          expenses,
          income,
          newDate
        );
      }
      const forecastEntry = {
        date: newDate,
        balance: newBalance,
      };
      forecastList.push(forecastEntry);
    }

    function calculateBalance(
      startingBalance: number,
      expenses: any,
      income: any,
      date: any
    ) {
      let newBalance = startingBalance;
      let newExpenses = expenses.filter((entry: any) => {
        return dayjs(entry.date).date() === dayjs(date).date();
      });
      let newIncome = income.filter((entry: any) => {
        return dayjs(entry.date).date() === dayjs(date).date();
      });

      let newExpensesTotal;
      if (newExpenses.length > 1) {
        newExpensesTotal = newExpenses.reduce((a: any, b: any) => {
          return a + trimAndFloat(b.expenses);
        }, 0);
      } else if (newExpenses.length === 1) {
        newExpensesTotal = trimAndFloat(newExpenses[0].expenses);
      } else {
        newExpensesTotal = 0;
      }

      let newIncomeTotal;
      if (newIncome.length > 1) {
        newIncomeTotal = newIncome.reduce((a: any, b: any) => {
          return a + trimAndFloat(b.income);
        }, 0);
      } else if (newIncome.length === 1) {
        newIncomeTotal = trimAndFloat(newIncome[0].income);
      } else {
        newIncomeTotal = 0;
      }

      newBalance = newBalance - newExpensesTotal + newIncomeTotal;

      return newBalance;
    }

    function trimAndFloat(amount: string) {
      return parseFloat(amount.slice(1));
    }

    return forecastList;
  }
}

export interface BudgetForecast {
  length: number;
  startDate: string;
  data: any;
}

export const RepeatedDefaults = [
  "None",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Yearly",
];

export const RepeatedDefaultsMap = {
  weekly: (date: any) => dayjs(date).add(1, "week"),
  biweekly: (date: any) => dayjs(date).add(2, "week"),
  monthly: (date: any) => dayjs(date).add(1, "month"),
  yearly: (date: any) => dayjs(date).add(1, "year"),
};
