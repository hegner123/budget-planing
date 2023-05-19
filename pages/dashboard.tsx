import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user }: any = useUser();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
