import { useEffect, useState } from "react";
import { ExpenseEntry, IncomeEntry, BalanceEntry } from "@budget/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const useSubscribe = (balance, income, expense) => {
  const [updatedBalance, setUpdatedBalance] = useState<BalanceEntry[]>(balance);
  const [updatedIncome, setUpdatedIncome] = useState<IncomeEntry[]>(income);
  const [updatedExpense, setUpdatedExpense] = useState<ExpenseEntry[]>(expense);
  const [connected, setConnected] = useState(false);
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const LiveBalance = supabaseClient
      .channel("all")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        handleUpdateDataByTable(payload, payload.table, {
          updatedBalance,
          updatedExpense,
          updatedIncome,
        });
      })
      .subscribe();
    setConnected(true);

    function handleUpdateDataByTable(
      data: any,
      table: string,
      { updatedBalance, updatedExpense, updatedIncome }
    ) {
      switch (table) {
        case "Balance":
          handleUpdatedBalanceData(data, updatedBalance);
          break;
        case "Expenses":
          handleUpdatedExpenseData(data, updatedExpense);
          break;
        case "Income":
          handleUpdatedIncomeData(data, updatedIncome);
          break;
        default:
        // console.log("No table found");
      }
    }

    function handleUpdatedBalanceData(data: any, updatedBalance: any) {
      switch (data.eventType) {
        case "INSERT":
          let newBalance = [data.new, ...balance];
          setUpdatedBalance(newBalance as BalanceEntry[]);
          break;
        case "UPDATE":
          const newUpdatedBalance = balance?.map((entry: BalanceEntry) => {
            if (entry.id === data.new.id) {
              return data.new;
            }
            return entry;
          });

          setUpdatedBalance(newUpdatedBalance as BalanceEntry[]);
          break;
        case "DELETE":
          const filteredBalance = balance?.filter((entry: any) => {
            return entry.id !== data.old.id;
          });

          setUpdatedBalance(filteredBalance as BalanceEntry[]);
          break;
        default:
        // console.log("No event type found");
      }
    }

    function handleUpdatedExpenseData(data: any, updatedExpense: any) {
      switch (data.eventType) {
        case "INSERT":
          let newExpense = [data.new, ...expense];

          setUpdatedExpense(newExpense as ExpenseEntry[]);
          break;
        case "UPDATE":
          const newUpdatedExpense = expense.map((entry: ExpenseEntry) => {
            if (entry.id === data.new.id) {
              return data.new;
            }
            return entry;
          });

          setUpdatedExpense(newUpdatedExpense as ExpenseEntry[]);
          break;
        case "DELETE":
          const filteredExpense = expense.filter(
            (entry: ExpenseEntry) => entry.id !== data.old.id
          );

          setUpdatedExpense(filteredExpense as ExpenseEntry[]);
          break;
        default:
        // console.log("No event type found");
      }
    }

    function handleUpdatedIncomeData(data: any, updatedIncome: any) {
      switch (data.eventType) {
        case "INSERT":
          let newIncome = [data.new, ...income];

          setUpdatedIncome(newIncome as IncomeEntry[]);
          break;
        case "UPDATE":
          const newUpdatedIncome = income.map((entry: IncomeEntry) => {
            if (entry.id === data.new.id) {
              return data.new;
            }
            return entry;
          });

          setUpdatedIncome(newUpdatedIncome as IncomeEntry[]);
          break;
        case "DELETE":
          const filteredIncome = income.filter(
            (entry: IncomeEntry) => entry.id !== data.old.id
          );

          setUpdatedIncome(filteredIncome as IncomeEntry[]);

          break;
        default:
        // console.log("No event type found");
      }
    }

    return () => {
      LiveBalance.unsubscribe();
      setConnected(false);
    };
  }, [
    connected,
    supabaseClient,
    updatedBalance,
    updatedIncome,
    updatedExpense,
    balance,
    income,
    expense,
  ]);

  return { connected, updatedBalance, updatedIncome, updatedExpense };
};

export { useSubscribe };
