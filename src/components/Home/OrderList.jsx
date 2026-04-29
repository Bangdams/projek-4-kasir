import { AnimatePresence, motion } from "framer-motion";
import trash from "../../assets/icons/trash.svg";
import { useState } from "react";
import { Struck } from "./Struck";
import { formatRupiah } from "../helper/FormatRupiah";

export function OrderList({
  orders,
  setOrders,
  onChoose,
  setModalMode,
  setMenus,
  isCartOpen,
  setIsCartOpen,
}) {
  // Handler hapus
  const onDelete = (id) => {
    const deletedOrder = orders.find((order) => order.id === id);

    setOrders((prevOrders) => {
      const remainingOrders = prevOrders.filter((order) => order.id !== id);

      if (remainingOrders.length === 0) {
        setActive(null);
        setCashAmount("");
      }

      return remainingOrders;
    });

    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === deletedOrder.id
          ? { ...menu, stock: menu.stock + deletedOrder.quantity }
          : menu,
      ),
    );
  };

  // Hitung total biaya semua pesanan
  const getSubTotal = () => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  };

  const [active, setActive] = useState(null);
  const [cashAmount, setCashAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isPrinted, setIsPrinted] = useState(false);
  const [spicyLevel, setSpicyLevel] = useState("Level 0 (Tidak Pedas)");

  const pph = 0;
  const subTotal = getSubTotal();
  const grandTotal = subTotal + pph;
  const buttons = ["Qris", "Cash"];
  const hasSeblakInCart = orders.some((order) => order.category === "seblak");

  const parsedCash = parseInt(cashAmount) || 0;
  const change = parsedCash - grandTotal;
  const isCashInsufficient =
    active === "Cash" && parsedCash > 0 && parsedCash < grandTotal;
  const isChargeDisabled =
    (active === "Cash" && parsedCash < grandTotal) || !active;

  const [seblakNote, setSeblakNote] = useState("");

  const handleCharge = () => {
    window.print();
    setIsPrinted(true);
  };

  const handleFinishTransaction = () => {
    // === 1. LOGIKA SIMPAN HISTORY KE LOCAL STORAGE ===
    const existingHistoryJSON = localStorage.getItem("historyTransaksi");
    const history = existingHistoryJSON ? JSON.parse(existingHistoryJSON) : [];

    // [BENAR] Date.now() dipanggil di sini karena ini terjadi saat tombol diklik, bukan saat komponen di-render.
    history.push({
      idStruk: Date.now(),
      tanggal: new Date().toISOString(),
      metodeBayar: active,
      totalPendapatan: grandTotal,
    });

    localStorage.setItem("historyTransaksi", JSON.stringify(history));

    // === 2. LOGIKA REKAP PENJUALAN (BAR CHART) ===
    const existingRekapJSON = localStorage.getItem("rekapPenjualan");
    const existingRekap = existingRekapJSON
      ? JSON.parse(existingRekapJSON)
      : {};

    orders.forEach((order) => {
      if (existingRekap[order.id]) {
        existingRekap[order.id].qty += order.quantity;
        existingRekap[order.id].revenue += order.total;
      } else {
        existingRekap[order.id] = {
          id: order.id,
          label: order.label,
          category: order.category,
          qty: order.quantity,
          revenue: order.total,
        };
      }
    });

    localStorage.setItem("rekapPenjualan", JSON.stringify(existingRekap));

    // === 3. LOGIKA RESET KASIR ===
    setOrders([]);
    setActive(null);
    setCashAmount("");
    setCustomerName("");
    setIsPrinted(false);
    setSeblakNote("");

    if (setIsCartOpen) setIsCartOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-40 md:hidden print:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`
          text-black 
          fixed md:sticky top-0 right-0 h-screen 
          w-[85vw] sm:w-100 md:w-auto md:col-span-3 
          bg-white z-50 md:z-0 
          py-10 px-5 overflow-y-scroll scroll-y-no-bar print:hidden
          transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
          ${isCartOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">Order List</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="md:hidden w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center font-bold text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <AnimatePresence>
          {orders.map((item) => (
            <motion.div
              key={item.cartId || item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="relative mb-5"
            >
              <div className="absolute inset-0 bg-red-500 rounded-2xl flex justify-end items-center px-6 overflow-hidden z-0">
                <img src={trash} alt="trash" className="w-6 h-6" />
              </div>

              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={{ left: 1, right: 0 }}
                onDragEnd={(event, info) => {
                  if (info.offset.x < -80) {
                    onDelete(item.id);
                  }
                }}
                className="h-20 bg-[#F7F9FA] rounded-2xl flex flex-row gap-5 items-center cursor-pointer relative z-10 shadow-sm"
                onClick={() => {
                  onChoose(item);
                  setModalMode("edit");
                }}
                whileTap={{ cursor: "grabbing" }}
              >
                <div className="w-20 h-full bg-yellow-200 p-3 flex justify-center items-center shrink-0 rounded-l-2xl">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="max-h-full max-w-full object-contain"
                    draggable="false"
                  />
                </div>

                <div className="w-full font-medium pr-4">
                  <p className="text-md">{item.label}</p>

                  {item.note && (
                    <p className="text-xs text-pink-500 italic mt-0.5 line-clamp-1">
                      * {item.note}
                    </p>
                  )}

                  <div className="flex flex-row justify-between mt-1">
                    <p className="font-normal text-gray-600 text-xs">
                      {formatRupiah(item.price)}{" "}
                      <span className="text-xs">| x{item.quantity}</span>
                    </p>
                    <p className="font-bold text-xs">
                      {formatRupiah(item.total)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {orders.length > 0 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            >
              <div className="font-medium mb-10 px-3 mt-5">
                <div className="flex flex-row justify-between items-center mb-3">
                  <p>Pembeli :</p>
                  <input
                    type="text"
                    placeholder="Nama (Opsional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-xl px-3 py-1 text-sm outline-none focus:border-blue-500 text-right"
                  />
                </div>

                {hasSeblakInCart && (
                  <>
                    <div className="flex flex-row justify-between items-center mb-3">
                      <p>Level Pedas :</p>
                      <select
                        value={spicyLevel}
                        onChange={(e) => setSpicyLevel(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-xl px-3 py-1 text-sm outline-none focus:border-pink-500 text-center"
                      >
                        <option value="Level 0 (Tidak Pedas)">Level 0</option>
                        <option value="Level 1 (Sedang)">Level 1</option>
                        <option value="Level 2 (Pedas)">Level 2</option>
                        <option value="Level 3 (Ekstra Pedas)">Level 3</option>
                      </select>
                    </div>

                    {/* 3. [BARU] Input Catatan Seblak */}
                    <div className="flex flex-row justify-between items-center mb-3">
                      <p>Catatan Seblak :</p>
                      <input
                        type="text"
                        placeholder="Cth: Kuah dikit, manis..."
                        value={seblakNote}
                        onChange={(e) => setSeblakNote(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-xl px-3 py-1 text-sm outline-none focus:border-pink-500 text-right"
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-row justify-between mt-5">
                  <p>Sub Total :</p>
                  <p>{formatRupiah(subTotal)}</p>
                </div>

                <div className="flex flex-row justify-between items-center mt-3">
                  <p>Bayar :</p>
                  <div className="space-x-2">
                    {buttons.map((btn) => (
                      <motion.button
                        key={btn}
                        onClick={() => {
                          setActive(btn);
                          if (btn !== "Cash") setCashAmount("");
                        }}
                        initial={{
                          backgroundColor: "#FFFFFF",
                          color: "#000000",
                        }}
                        animate={{
                          backgroundColor:
                            active === btn ? "#3B82F6" : "#FFFFFF",
                          color: active === btn ? "#FFFFFF" : "#000000",
                        }}
                        whileHover={{
                          backgroundColor: "#3B82F6",
                          color: "#FFFFFF",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="border border-gray-300 px-5 py-1 rounded-xl cursor-pointer"
                      >
                        {btn}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {active === "Cash" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4"
                    >
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                        <div className="flex flex-col">
                          <label className="text-sm text-gray-500 mb-1">
                            Nominal Tunai (K):
                          </label>
                          <input
                            type="text"
                            value={Number(cashAmount).toLocaleString("id-ID")}
                            onChange={(e) => {
                              // hapus titik dulu biar bisa parse angka
                              const rawValue = e.target.value.replace(
                                /\./g,
                                "",
                              );
                              setCashAmount(rawValue);
                            }}
                            placeholder={`Min. ${grandTotal.toLocaleString("id-ID")}`}
                            className={`w-full bg-white border rounded-xl px-4 py-2 outline-none transition-all ${
                              isCashInsufficient
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            }`}
                          />
                        </div>

                        <div className="flex flex-row justify-between items-center pt-2 border-t border-gray-200">
                          <p className="text-gray-600">Kembalian :</p>
                          <p
                            className={`text-lg font-bold ${change > 0 ? "text-green-600" : "text-gray-800"}`}
                          >
                            {formatRupiah(change > 0 ? change : 0)}
                          </p>
                        </div>

                        {/* Notifikasi jika uang kurang */}
                        {isCashInsufficient && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-red-500 text-center"
                          >
                            Uang tidak mencukupi!
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isPrinted ? (
                <button
                  disabled={isChargeDisabled}
                  onClick={handleCharge}
                  className={`py-5 w-full text-xl rounded-2xl font-medium transition-colors duration-300 mt-5 ${
                    isChargeDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-pink-600 hover:bg-pink-700 text-white cursor-pointer shadow-lg hover:shadow-pink-500/30"
                  }`}
                >
                  {active
                    ? `Bayar | ${formatRupiah(grandTotal)}`
                    : "Pilih Metode Pembayaran"}
                </button>
              ) : (
                <div className="flex flex-col gap-3 mt-5 print:hidden">
                  <button
                    onClick={handleCharge}
                    className="py-3 w-full text-lg rounded-2xl font-medium border-2 border-pink-600 text-pink-600 bg-white hover:bg-pink-50 cursor-pointer transition-colors"
                  >
                    🖨️ Print Ulang (Reprint)
                  </button>
                  <button
                    onClick={handleFinishTransaction}
                    className="py-3 w-full text-lg rounded-2xl font-medium bg-green-500 hover:bg-green-600 text-white shadow-lg cursor-pointer transition-colors"
                  >
                    ✅ Selesai & Buat Pesanan Baru
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print Struck */}
      <Struck
        active={active}
        change={change}
        customerName={customerName}
        grandTotal={grandTotal}
        orders={orders}
        parsedCash={parsedCash}
        spicyLevel={spicyLevel}
        seblakNote={seblakNote}
      />
    </>
  );
}
