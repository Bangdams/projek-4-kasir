import { BarMenuChart } from "./BarMenuChart";
import { LineSalesChart } from "./LineSalesChart";
import PaymentPieChart from "./PaymentPieChart";

export function Dashboard() {
  // === LOGIKA RESET DATA ===
  const handleResetData = () => {
    // 1. Berikan peringatan keras sebelum menghapus
    const isConfirm = window.confirm(
      "PERINGATAN KRITIS: Apakah Anda yakin ingin menghapus SEMUA data penjualan dan riwayat transaksi? Data yang dihapus tidak dapat dikembalikan.",
    );

    // 2. Jika user klik "OK/Yes"
    if (isConfirm) {
      localStorage.removeItem("rekapPenjualan");
      localStorage.removeItem("historyTransaksi");

      alert("Data berhasil di-reset. Dashboard akan dimuat ulang.");

      // 3. Refresh halaman agar semua grafik kembali kosong (reset state)
      window.location.reload();
    }
  };

  return (
    <div className="col-span-11 bg-[#F7F9FA] p-10 text-black">
      <div className="flex justify-between items-center mt-5 mb-10">
        <h2 className="text-3xl font-medium">Dashboard</h2>

        {/* === TOMBOL RESET DISINI === */}
        <button
          onClick={handleResetData}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>⚠️</span> Reset Semua Data
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 mt-10">
          <div className="flex justify-between mb-5">
            <h2 className="text-[22px]">Sales Trends (Daily & Weekly)</h2>
            <div className="flex items-center">
              <p>Filter </p>
              <select name="date" className="cursor-pointer">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <LineSalesChart />
        </div>

        <div className="col-span-6 mt-10">
          <div className="flex justify-between mb-5">
            <h2 className="text-[22px]">Top-Selling Menu</h2>
            <div className="flex items-center">
              <p>Filter </p>
              <select name="date" className="cursor-pointer">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <BarMenuChart />
        </div>

        <div className="col-span-6 mt-10">
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
          <PaymentPieChart />
        </div>
      </div>
    </div>
  );
}
