"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const ForecastLength = (props: any) => {
  const pathname = usePathname();
  const { length } = pathname;
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <main className="p-5 dashboard-main">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast {length}</h1>
      </div>
    </main>
  );
};

export default ForecastLength;
