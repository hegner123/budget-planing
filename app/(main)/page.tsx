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

export default function Page() {
  const [user, setUser] = useAtom(loggedInUserAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const router = useRouter();
  const { getSession } = useSession();
  const [demoData, setDemoData] = useState(null);
  const url =
    "https://ukbhnbmumzaorpsnhjoa.supabase.co/storage/v1/object/public/demo_data/demo/demo.json";

  async function getDemoData() {
    try {
      const res = await fetch(url);

      const data = await res.json();
      console.log("demo data", data.forecastData);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setDemoData(getDemoData());
  }, []);

  // useEffect(() => {
  //   demoData.map((item: any) => {
  //     console.log("demo item", item);
  //   });
  // }, [demoData]);

  // useEffect(() => {
  //   getSession()
  //     .then((res) => {
  //       setUser(res.data.session.user.id as string);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setUser("error");
  //       setLoading(false);
  //     });
  // }, [getSession, setLoading, setUser]);

  // useEffect(() => {
  //   if (user !== "" && user !== "error" && !loading) {
  //     router.push("/dashboard");
  //     return;
  //   }
  // }, [user, router, loading]);

  return (
    <>
      <main className="grid min-w-full min-h-screen ">
        <section className="grid grid-cols-4 grid-rows-5 gap-3 ">
          <h2 className="col-start-2 row-start-2 text-6xl col-span-full">
            Budget Forecast
          </h2>
          <div className="flex col-start-2 row-start-3 gap-3 h-fit ">
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
        <section className="grid grid-cols-12 grid-rows-5 gap-3 ">
          <div className="col-start-2 row-start-2 col-span-full">
            {demoData?.forecastData &&
              demoData?.forecastData?.map((item: ForecastEntry, i: number) => {
                <ForecastAccordion item={item} i={i} />;
              })}
          </div>
        </section>
      </main>
    </>
  );
}


