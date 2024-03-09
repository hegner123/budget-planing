"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSession from "@budget/hooks/auth/useSession";
import { loadingAtom, loggedInUserAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";
import Link from "next/link";
import { ForecastAccordion } from "@budget/components/forecastAccordion/forecastAccordion";
import { ForecastEntry } from "@budget/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";

// import { LOCAL_DEMO_DATA } from "@budget/constants";

/**
 * A Component that renders a page!
 * @module app/main/page
 * @type {function}
 * @returns {JSX.Element} - A JSX Element
 * @see module:app/main/page
 *
 */

/** Render Page */

export default function Page() {
    /**
     * @type {Atom}
     */
    const [user, setUser] = useAtom(loggedInUserAtom);
    const [loading, setLoading] = useAtom(loadingAtom);
    const router = useRouter();
    const { getSession } = useSession();

    const {
        isPending,
        isError,
        data,
        error,
    }: { isPending: any; isError: any; data: any; error: any } = useQuery({
        queryKey: ["demo_data"],
        queryFn: getDemoData,
    });
    /**
     * A url to fetch demo data from supabase blob storage
     * @type {string}
     */
    const supabaseBlobStorageUrlDemoDataUrl: string =
        "https://ukbhnbmumzaorpsnhjoa.supabase.co/storage/v1/object/public/demo_data/demo/demo.json";

    /**
     * @function getDemoData
     * @returns {Promise} - A promise
     * @description - A function that fetches demo data
     *
     *
     *
     */
    async function getDemoData() {
        const results = new Promise((resolve, reject) => {
            const res = fetch(supabaseBlobStorageUrlDemoDataUrl).then((res) =>
                res.json()
            );
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
        return <Loading />;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <>
            <main className="grid min-w-full min-h-screen ">
                <section className="grid grid-cols-12 gap-3 auto-rows-fr max-h-[100vh] xl:pt-40 xl:pb-40 md:pt-30 md:pb-30 xl:min-h-[540px]">
                    <h2 className="col-start-2 row-start-2 text-6xl col-span-full">
                        Budget Forecast
                    </h2>
                    <h6 className="col-start-2 row-start-3 text-xl italic col-span-full">
                        Demo credentials available on login screen
                    </h6>
                    <div className="flex col-span-5 col-start-2 row-start-3 gap-3 mt-10 h-fit">
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
                    <div className="col-start-2 xl:col-end-[6]  col-end-[-2] ">
                        <h3 className="text-4xl">Forecast Data</h3>
                        <p>
                            The forecast function provides the forecasted
                            balance and contributing expenses and incomes.
                        </p>
                    </div>
                    <ul className="grid col-start-2  xl:col-start-6 col-end-[-2] gap-3 mb-10">
                        {data.forecastData &&
                            data.forecastData[0].map(
                                (item: ForecastEntry, i: number) => (
                                    <li key={`forecast${i}`}>
                                        <ForecastAccordion item={item} i={i} />
                                    </li>
                                )
                            )}
                    </ul>
                </section>
            </main>
        </>
    );
}

