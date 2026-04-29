export function TransactionTable({ transactions }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-10">
      <div className="flex justify-between mb-5">
        <h2 className="text-[22px]">Transaction</h2>
        <div className="flex items-center">
          <p>Filter </p>
          <select name="date" className="cursor-pointer">
            <option value="daily">Realtime</option>
            <option value="weekly">Date</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID Transaksi</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Kasir</th>
            <th className="p-2">Metode</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{tx.id}</td>
              <td className="p-2">{tx.date}</td>
              <td className="p-2">{tx.cashier}</td>
              <td className="p-2">{tx.method}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    tx.status === "SUCCEEDED"
                      ? "bg-green-100 text-green-700"
                      : tx.status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td className="p-2">Rp {tx.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4">
          <h4 className="text-gray-600">Total Transaksi</h4>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-4">
          <h4 className="text-gray-600">Nominal Penjualan</h4>
          <p className="text-2xl font-bold">Rp 15.000.000</p>
        </div>
        <div className="bg-white p-4">
          <h4 className="text-gray-600">Sukses vs Gagal</h4>
          <p className="text-lg">110 ✅ / 10 ❌</p>
        </div>
      </div>
    </div>
  );
}
