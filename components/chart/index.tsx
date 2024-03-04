import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import useExport from "@budget/hooks/export/useExport";
export default function Chart({ forecastData, x, y, title }) {
  const { exportToExcel } = useExport();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const displayRow = forecastData.map((item) => {
    if (
      item.balanceDetails.incomesTotal !== 0 ||
      item.balanceDetails.expensesTotal !== 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels: forecastData.map((item) => dayjs(item.date).format("MM/DD")),
    datasets: [
      {
        label: "Balance",
        data: forecastData.map((item) => item.balance),
        fill: false,
        borderColor: "rgb(0, 0, 0)",
        tension: 0.1,
      },
    ],
  };

  function handleExportClick() {
    exportToExcel(forecastData, "forecast.xlsx");
  }
  return (
    <div className="col-span-6 col-start-4 min-h-[100vh]">
      <Line options={options} data={data} />
      <button
        onClick={() => handleExportClick()}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg">
        Export to Excel
      </button>
      <table className="justify-between w-full ">
        <thead>
          <th className="text-left">Date</th>
          <th className="text-left">Balance</th>
          <th className="text-left">Incomes</th>
          <th className="text-left">Expenses</th>
        </thead>
        <tbody>
          {forecastData.map((item, i) => {
            return (
              <>
                {displayRow[i] && (
                  <tr key={`${item.balance}-${i}`}>
                    <td className="">{dayjs(item.date).format("MM/DD")}</td>

                    <td className="">${item.balanceDetails.newBalance}</td>

                    {item.balanceDetails.incomesTotal !== 0 ? (
                      <td className="bg-green-200 w-fit">
                        <ul>
                          {item.balanceDetails.incomes.map((income, i) => (
                            <li key={`income${i}`}>
                              <p className="">
                                {income.name}: ${income.amount}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ) : (
                      <td></td>
                    )}

                    {item.balanceDetails.expensesTotal !== 0 ? (
                      <td className="bg-red-200 w-fit">
                        <ul>
                          {item.balanceDetails.expenses.map((expense, i) => (
                            <li key={`expense${i}`}>
                              <p className="">
                                {expense.name}: ${expense.amount}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
