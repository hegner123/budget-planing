import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { configForecastDurationAtom } from "@budget/store/state";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import duration from "dayjs/plugin/duration";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { ForecastLength } from "@budget/types/forecast";

const TestingComponent = () => {
  const [field1, setField1] = useState<any>("");
  const [field2, setField2] = useState<any>("");
  const [field3, setField3] = useState<any>("");
  const [field4, setField4] = useState<any>("");
  const [field5, setField5] = useState<any>("");
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>("");
  const [configForecastDuration, setConfigForecastDuration] = useAtom(
    configForecastDurationAtom
  );
  const [results, setResults] = useState<any>("");
  dayjs.extend(duration);

  useEffect(() => {
    if (field1 && field2 && startDate) {
      setEndDate(startDate?.add(field1, field2));
    }
  }, [field1, field2, startDate]);

  function handleSubmit() {
    let durationValue: any = dayjs.duration(field1, field2);
    setConfigForecastDuration(durationValue);
    setResults(JSON.stringify(durationValue));
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid grid-cols-12 gap-5 col-span-full">
          <Card className="grid grid-cols-12 col-span-4 gap-5 p-5 bg-slate-200">
            <h1 className="text-2xl col-span-full">Testing Component</h1>
            <TextField
              className="col-span-6"
              label="Field 1"
              value={field1}
              type="number"
              onChange={(e) => setField1(e.target.value)}
            />
            <TextField
              className="col-span-6"
              label="Field 2"
              value={field2}
              onChange={(e) => setField2(e.target.value)}
            />
            <TextField
              className="col-span-6"
              label="Field 3"
              value={field3}
              onChange={(e) => setField3(e.target.value)}
            />
            <TextField
              className="col-span-6"
              label="Field 4"
              value={field4}
              onChange={(e) => setField4(e.target.value)}
            />
            <TextField
              className="col-span-6"
              label="Field 5"
              value={field5}
              onChange={(e) => setField5(e.target.value)}
            />

            <DatePicker
              label="Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              className="w-full col-span-6 "
            />

            <Button
              className="col-span-2 text-white border-2 border-black border-solid bg-slate-700 hover:text-black hover:bg-slate-300"
              onClick={handleSubmit}>
              Submit
            </Button>
          </Card>
          <Card className="grid grid-cols-12 col-span-6 p-5 bg-slate-200">
            <h3 className="text-2xl col-span-full">Results</h3>
            <p className="col-span-full">
              StartDate: {JSON.stringify(startDate)}
            </p>
            <p className="col-span-full">
              ForecastLength: {JSON.stringify(endDate)}
            </p>
            <p className="col-span-full">
              ForecastDiff:{" "}
              {JSON.stringify(startDate?.diff(endDate, "day") * -1)}
            </p>

            <p className="col-span-5">
              {JSON.stringify(configForecastDuration)}
            </p>

            <p className="col-span-full">{results}</p>
          </Card>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default TestingComponent;
