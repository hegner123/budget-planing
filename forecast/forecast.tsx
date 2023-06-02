import dayjs from "dayjs";
export class BudgetForecast {
  constructor(length: number, startDate: string, data: any) {
    this.length = length;
    this.startDate = startDate;
    this.data = data;
  }
  getForecast() {
    let forecastList = [];
    const balance = this.data.filter((entry: any) => entry.type === "balance");
    const balanceLength = balance.length;
    let startingBalance = parseAmount(balance[balanceLength - 1].balance);
    const expenses = this.data.filter(
      (entry: any) => entry.type === "expenses"
    );

    const income = this.data.filter((entry: any) => entry.type === "income");
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
          return a + parseAmount(b.expenses);
        }, 0);
      } else if (newExpenses.length === 1) {
        newExpensesTotal = parseAmount(newExpenses[0].expenses);
      } else {
        newExpensesTotal = 0;
      }
      let newIncomeTotal;
      if (newIncome.length > 1) {
        newIncomeTotal = newIncome.reduce((a: any, b: any) => {
          return a + parseAmount(b.income);
        }, 0);
      } else if (newIncome.length === 1) {
        newIncomeTotal = parseAmount(newIncome[0].income);
      } else {
        newIncomeTotal = 0;
      }

      newBalance = newBalance - newExpensesTotal + newIncomeTotal;

      return newBalance;
    }

    function parseAmount(amount: string) {
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
