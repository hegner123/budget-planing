import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { compiledDataAtom } from "@budget/store/state";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Forecast = () => {
  const [compiledData] = useAtom(compiledDataAtom);
  const [forecastLength, setForecastLength] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setForecastLength(event.target.value as string);
  };
  return (
    <main className="p-5 dashboard-main">
      <div className="grid grid-cols-12 mb-5">
        <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast</h1>
        <p className="col-span-full">{JSON.stringify(compiledData)}</p>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Length</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={forecastLength}
            label="Age"
            onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </main>
  );
};

export default Forecast;
