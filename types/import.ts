import { Row } from "read-excel-file";

export type excellData = excellRow[];

export interface excellRow {
  label: string;
  amount: number;
  date: string;
  repeated: string;
  type: string;
}
