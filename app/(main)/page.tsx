"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSession from "@budget/hooks/auth/useSession";
import { loadingAtom, loggedInUserAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";
import Link from "next/link";
import { ForecastAccordion } from "@budget/components/forecastAccordion/forecastAccordion";
import { ForecastEntry } from "@budget/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { LOCAL_DEMO_DATA } from "@budget/constants";

export default function Page() {
  const [user, setUser] = useAtom(loggedInUserAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const router = useRouter();
  const { getSession } = useSession();

  const queryClient = useQueryClient();
  const {
    isPending,
    isError,
    data,
    error,
  }: { isPending: any; isError: any; data: any; error: any } = useQuery({
    queryKey: ["demo_data"],
    queryFn: getDemoData,
  });
  const url =
    "https://ukbhnbmumzaorpsnhjoa.supabase.co/storage/v1/object/public/demo_data/demo/demo.json";

  async function getDemoData() {
    const results = new Promise((resolve, reject) => {
      const res = fetch(url).then((res) => res.json());
      console.log("res", res);
      resolve(res);
      reject("error");
    });

    return results;
  }

  useEffect(() => {
    getSession()
      .then((res) => {
        console.log("res", res);
        setUser(res.data.session ? res.data.session.user.id : "error");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setUser("error");
        setLoading(false);
      });
  }, [getSession, setLoading, setUser]);

  useEffect(() => {
    if (user !== "" && user !== "error" && !loading) {
      router.push("/dashboard");
      return;
    }
  }, [user, router, loading]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <main className="grid min-w-full min-h-screen grid-flow-row auto-rows-fr ">
        <section className="grid grid-cols-12 gap-3 auto-rows-fr">
          <h2 className="col-start-2 row-start-2 text-6xl col-span-full">
            Budget Forecast
          </h2>
          <div className="flex col-span-5 col-start-2 row-start-3 gap-3 h-fit ">
            <Button variant="contained" className="btn-primary">
              <Link href="/login" passHref>
                Login
              </Link>
            </Button>
            <Button variant="contained" className="btn-primary">
              <Link href="/register" passHref>
                Register
              </Link>
            </Button>
            {/* <Button variant="contained" className="btn-primary">
              <Link href="/demo" passHref>
                Demo
              </Link>
            </Button> */}
          </div>
        </section>
        {/* <section className="grid grid-cols-12 grid-rows-5 gap-3 ">
          <div className="col-start-2 col-end-[6]">
            <h3 className="text-4xl">Dashboard view</h3>
            <p>Allows users to log all expenses and incomes.</p>
          </div>
        </section> */}
        <section className="grid grid-cols-12 gap-3 ">
          <div className="col-start-2 col-end-[6]">
            <h3 className="text-4xl">Forecast Data</h3>
            <p>
              The forecast function provides the forecasted balance and
              contributing expenses and incomes.
            </p>
          </div>
          <ul className="grid col-start-6 col-end-[-2] gap-3">
            {data.forecastData &&
              data.forecastData[0].map((item: ForecastEntry, i: number) => (
                <li key={`forecast${i}`}>
                  <ForecastAccordion item={item} i={i} />
                </li>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}

