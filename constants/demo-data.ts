"use client";
import useSession from "@budget/hooks/useSession";

export const demoData = () => {
  const demoExpenses = [
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

  const demoIncome = {
    name: "Test",
    amount: 2000,
    repeated: "Monthly",
    user: "",
    date: "2023-11-01",
  };

  const demoBalance = [
    {
      name: "Test",
      amount: 2000,
      user: "",
      date: "2023-11-14",
    },
  ];

  return { demoExpenses, demoIncome, demoBalance };
};
