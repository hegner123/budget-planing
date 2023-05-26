import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import { AddExpenseForm } from "@budget/components/addExpenses/addExpenses";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
export default function TestPage() {
  return (
    <div className="flex gap-2 p-5">
      <AddBalanceForm />
      <AddIncomeForm />
      <AddExpenseForm />
    </div>
  );
}
