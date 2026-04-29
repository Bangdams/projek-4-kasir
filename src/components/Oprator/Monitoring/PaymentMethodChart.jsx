import Chart from "react-apexcharts";

export function PaymentMethodChart() {
  const options = {
    labels: ["QRIS", "Cash", "E-Wallet"],
  };

  const series = [60, 25, 15]; // persentase transaksi

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-5">
        <h2 className="text-[22px]">Payment Distribution</h2>
        <div className="flex items-center">
          <p>Filter </p>
          <select name="date" className="cursor-pointer">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <Chart options={options} series={series} type="pie" height={300} />
    </div>
  );
}
