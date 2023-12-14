"use client";

export const demoData = () => {
  const demoExpensesTemplate = [
    {
      name: "Food",
      amount: 200,
      repeated: "Weekly",
      user: "",
      date: "2023-11-12",
    },
    {
      name: "Internet",
      amount: 100,
      repeated: "Monthly",
      user: "",
      date: "2023-11-10",
    },
  ];

  const demoIncomeTemplate = {
    name: "Test",
    amount: 2000,
    repeated: "Monthly",
    user: "",
    date: "2023-11-01",
  };

  const demoBalanceTemplate = {
    name: "Test",
    amount: 2000,
    user: "",
    date: "2023-11-14",
  };

  function demoExpenses(user) {
    const data = demoExpensesTemplate.map((expense) => {
      expense.user = user;
      return expense;
    });
    return data;
  }

  function demoIncome(user) {
    const data = demoIncomeTemplate;
    data.user = user;
    return data;
  }

  function demoBalance(user) {
    const data = demoBalanceTemplate;
    data.user = user;
    return data;
  }

  return { demoExpenses, demoIncome, demoBalance };
};
