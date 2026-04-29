import Chart from "react-apexcharts";

export default function PaymentPieChart() {
  const options = {
    labels: ["Cash", "QRIS", "E-Wallet"],
    colors: ["#10b981", "#f59e0b", "#6366f1"], // hijau, kuning, ungu
  };

  const series = [55, 25, 20]; // persentase transaksi

  return (
    <div className="bg-white rounded-lg shadow-md">
      <Chart options={options} series={series} type="donut" height={300} />
    </div>
  );
}
