import Chart from "react-apexcharts";

export function SalesTrendChart() {
  const options = {
    chart: { id: "sales-trend" },
    xaxis: {
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    stroke: { curve: "smooth" },
    colors: ["#f43f5e"],
  };

  const series = [
    {
      name: "Total Penjualan",
      data: [1200000, 1500000, 1000000, 1800000, 2000000],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md mb-10">
      <div className="flex justify-between mb-5">
        <h2 className="text-[22px]">Sales Trends</h2>
        <div className="flex items-center">
          <p>Filter </p>
          <select name="date" className="cursor-pointer">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
}
