import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

export function BarMenuChart() {
  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    // 1. Ambil data dari local storage
    const dataJSON = localStorage.getItem("rekapPenjualan");

    if (dataJSON) {
      const dataObj = JSON.parse(dataJSON);

      // 2. Ubah object menjadi array agar bisa di-sort
      const items = Object.values(dataObj);

      // 3. Urutkan dari yang terjual paling banyak ke paling sedikit
      items.sort((a, b) => b.qty - a.qty);

      // 4. Ambil top 5 saja agar grafik tidak terlalu padat
      const top5 = items.slice(0, 5);

      // 5. Masukkan ke dalam state ApexCharts
      setCategories(top5.map((item) => item.label));
      setSeriesData(top5.map((item) => item.qty));
    }
  }, []);

  const options = {
    chart: { id: "bar-menu" },
    xaxis: { categories: categories },
    colors: ["#3b82f6"], // biru Tailwind
    plotOptions: {
      bar: { borderRadius: 4, horizontal: false },
    },
  };

  const series = [{ name: "Terjual", data: seriesData }];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {categories.length > 0 ? (
        <Chart options={options} series={series} type="bar" height={300} />
      ) : (
        <div className="h-75 flex items-center justify-center text-gray-500 font-medium">
          Belum ada data penjualan.
        </div>
      )}
    </div>
  );
}
