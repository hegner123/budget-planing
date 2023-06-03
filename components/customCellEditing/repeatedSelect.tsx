import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { RepeatedDefaults } from "@budget/forecast/forecast";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  GridRenderCellParams,
  GridColDef,
  useGridApiContext,
} from "@mui/x-data-grid";

function RepeatingEditInputCell(props: GridRenderCellParams<any, string>) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = (newValue: string | null) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const handleRef = (element: HTMLSpanElement) => {
    if (element) {
      const select = element.querySelector<HTMLInputElement>(
        `select[value="${value}"]`
      );
      select?.focus();
    }
  };

  const capitalizeValue = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FormControl variant="standard" fullWidth>
        <Select
          ref={handleRef}
          id="repeated-select"
          value={value}
          onChange={(e) => handleChange(e.target.value)}>
          {RepeatedDefaults.map((item, i) => (
            <MenuItem value={item.toLowerCase()} key={`${item}${i}`}>
              {capitalizeValue(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export const renderRepeatingEditInputCell: GridColDef["renderCell"] = (
  params
) => {
  return <RepeatingEditInputCell {...params} />;
};
