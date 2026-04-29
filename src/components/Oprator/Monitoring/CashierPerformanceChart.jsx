import Chart from "react-apexcharts";

export function CashierPerformanceChart() {
  const options = {
    chart: { id: "cashier-performance" },
    xaxis: { categories: ["Kasir A", "Kasir B", "Kasir C"] },
  };

  const series = [
    {
      name: "Nominal Penjualan",
      data: [5000000, 7000000, 3000000],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-5">
        <h2 className="text-[22px]">Cashier Performance</h2>
        <div className="flex items-center">
          <p>Filter </p>
          <select name="date" className="cursor-pointer">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
