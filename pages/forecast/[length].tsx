import { useRouter } from "next/router";
const ForecastLength = () => {
  const router = useRouter();
  const { length } = router.query;
  return (
    <main className="p-5 dashboard-main">
      <div className="grid grid-cols-12 gap-5 mb-5">
        <h1 className="mt-5 mb-5 text-6xl col-span-full">Forecast</h1>
      </div>
    </main>
  );
};

export default ForecastLength;
