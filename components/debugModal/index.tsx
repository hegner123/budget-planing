import { useAtom } from "jotai";
import {
  showDebugModalAtom,
  compiledDataAtom,
  showNotificationAtom,
  notificationMessageAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  needsRefreshAtom,
  refreshedBalanceAtom,
  refreshedExpensesAtom,
  refreshedIncomeAtom,
  configForecastAtom,
  configForecastDurationAtom,
} from "@budget/store/state";
import Fab from "@mui/material/Fab";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
export default function DebugModal() {
  const [showDebugModal, setShowDebugModal] = useAtom(showDebugModalAtom);
  const [compiledData] = useAtom(compiledDataAtom);
  const [showNotification] = useAtom(showNotificationAtom);
  const [notificationMessage] = useAtom(notificationMessageAtom);
  const [deleteEntry] = useAtom(deleteEntryAtom);
  const [deleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [needsRefresh] = useAtom(needsRefreshAtom);
  const [refreshedBalance] = useAtom(refreshedBalanceAtom);
  const [refreshedExpenses] = useAtom(refreshedExpensesAtom);
  const [refreshedIncome] = useAtom(refreshedIncomeAtom);
  const [configForecast] = useAtom(configForecastAtom);
  const [configForecastDuration] = useAtom(configForecastDurationAtom);

  return (
    <div className=" col-span-full">
      <Fab
        variant="extended"
        size="large"
        color="info"
        aria-label="debug"
        className="fixed right-5 bottom-5 text-black bg-[#1976d2] border-[#1976d2] hover:text-white hover:bg-black hover:border-white border-solid border-2"
        onClick={() => setShowDebugModal(true)}>
        Debug
      </Fab>
      <Dialog onClose={() => setShowDebugModal(false)} open={showDebugModal}>
        <DialogTitle className="px-4 w-[500px]">Debug Modal</DialogTitle>
        <div className="px-4 mt-5">
          <h2>Compiled Data</h2>
          <pre>{JSON.stringify(compiledData, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Notification</h2>
          <pre>{JSON.stringify(showNotification, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Notification Message</h2>
          <pre>{JSON.stringify(notificationMessage, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Delete Entry</h2>
          <pre>{JSON.stringify(deleteEntry, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Delete Entry Type</h2>
          <pre>{JSON.stringify(deleteEntryType, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Needs Refresh</h2>
          <pre>{JSON.stringify(needsRefresh, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Refreshed Balance</h2>
          <pre>{JSON.stringify(refreshedBalance, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Refreshed Expenses</h2>
          <pre>{JSON.stringify(refreshedExpenses, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Refreshed Income</h2>
          <pre>{JSON.stringify(refreshedIncome, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Config Forecast</h2>
          <pre>{JSON.stringify(configForecast, null, 2)}</pre>
        </div>
        <div className="px-4 mt-5">
          <h2>Config Forecast Duration</h2>
          <pre>{JSON.stringify(configForecastDuration, null, 2)}</pre>
        </div>
      </Dialog>
    </div>
  );
}
