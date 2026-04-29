import Chart from "react-apexcharts";

export function LineSalesChart() {
  const options = {
    chart: { id: "line-sales" },
    xaxis: {
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    stroke: { curve: "smooth" },
    colors: ["#f43f5e"], // pink Tailwind
  };

  const series = [{ name: "Penjualan", data: [30, 40, 35, 50, 49] }];

  return (
    <div className="bg-white  rounded-lg shadow-md">
      <Chart options={options} series={series} type="line" height={400} />
    </div>
  );
}
