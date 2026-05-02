import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { formatRupiah } from "../helper/FormatRupiah";
import { useEffect } from "react";

export function Modal({
  isOpen,
  setIsOpen,
  count,
  setCount,
  setChoose,
  setOrders,
  choose,
  modalMode,
  setMenus,
}) {
  const [localAddOns, setLocalAddOns] = useState(choose?.selectedAddOns || []);
  const [note, setNote] = useState(choose?.note || "");

  // 1. [BARU] State untuk menangkap harga manual (default mengikuti choose.price jika ada)
  const [manualPrice, setManualPrice] = useState(choose?.price || 0);

  // 2. [BARU] Reset state manualPrice setiap kali modal dibuka/choose berubah
  useEffect(() => {
    if (choose) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setManualPrice(choose.price || 0);
    }
  }, [choose]);

  const toggleAddOn = (addon) => {
    setLocalAddOns((prev) => {
      const isExist = prev.find((a) => a.id === addon.id);
      if (isExist) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const updateOrder = (choose, count) => {
    // 3. [UPDATE] Gunakan manualPrice jika isManualPrice true, jika tidak gunakan choose.price
    const basePrice = choose.isManualPrice
      ? parseInt(manualPrice) || 0
      : choose.price;

    const addonsPrice = localAddOns.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = basePrice + addonsPrice;
    const finalTotal = unitPrice * count;

    setMenus((prevMenus) => {
      if (modalMode === "add") {
        return prevMenus.map((menu) =>
          menu.id === choose.id ? { ...menu, stock: menu.stock - count } : menu,
        );
      } else {
        const diff = count - choose.quantity;
        return prevMenus.map((menu) =>
          menu.id === choose.id ? { ...menu, stock: menu.stock - diff } : menu,
        );
      }
    });

    setOrders((prevOrders) => {
      if (modalMode === "edit") {
        return prevOrders.map((order) =>
          order.cartId === choose.cartId
            ? {
                ...order,
                quantity: count,
                selectedAddOns: localAddOns,
                total: finalTotal,
                note: note,
                price: basePrice, // [UPDATE] Simpan harga terbaru ke keranjang
              }
            : order,
        );
      } else {
        return [
          ...prevOrders,
          {
            ...choose,
            cartId: Date.now(),
            quantity: count,
            selectedAddOns: localAddOns,
            total: finalTotal,
            note: note,
            price: basePrice, // [UPDATE] Simpan harga terbaru ke keranjang
          },
        ];
      }
    });
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCount(Math.min(value, choose.stock));
    }
  };

  // 4. [UPDATE] Dinamika perhitungan UI di tombol dan header
  const currentBasePrice = choose?.isManualPrice
    ? parseInt(manualPrice) || 0
    : choose
      ? parseInt(choose.price) || 0
      : 0;

  const currentAddonsPrice = localAddOns.reduce(
    (sum, a) => sum + (parseInt(a.price) || 0),
    0,
  );
  const currentTotalPreview = (currentBasePrice + currentAddonsPrice) * count;

  return (
    <AnimatePresence>
      {isOpen && choose && (
        <motion.div
          className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-100 p-6 max-h-[90vh] flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              {choose.label} {/* Tampilkan Nama Menu */}
            </h2>

            <div className="overflow-y-auto mb-6 pr-2">
              {/* 5. [BARU] Input Harga Manual Render Conditional */}
              {choose.isManualPrice && (
                <div className="mb-5 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Tentukan Harga Sendiri:
                  </h3>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={manualPrice === 0 ? "" : manualPrice} // Kosongkan jika 0 agar mudah diketik
                      onChange={(e) => setManualPrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-medium text-lg"
                      placeholder="Masukkan harga"
                      autoFocus={modalMode === "add"}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Ketik harga total paket seblak tanpa titik
                  </p>
                </div>
              )}

              {/* Seksi Add-on Render */}
              {choose.addOns && choose.addOns.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Pilih Tambahan (Add-ons):
                  </h3>
                  <div className="space-y-2">
                    {choose.addOns.map((addon) => {
                      const isChecked = localAddOns.some(
                        (a) => a.id === addon.id,
                      );
                      return (
                        <label
                          key={addon.id}
                          className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${
                            isChecked
                              ? "border-pink-500 bg-pink-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddOn(addon)}
                              className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 cursor-pointer"
                            />
                            <span className="font-medium text-gray-800">
                              {addon.label}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">
                            {addon.price !== "0K" ? `+${addon.price}` : "Free"}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Seksi Input Catatan */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Catatan Khusus:
                </h3>
                <input
                  type="text"
                  placeholder="Cth: Tanpa bawang, pedas dikit, dibungkus..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm transition-all"
                />
              </div>

              {/* Seksi Kuantitas */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Kuantitas:</h3>
                <div className="flex items-center gap-4 justify-start">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer text-xl font-bold transition-colors"
                    onClick={() => count > 1 && setCount(count - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={count}
                    onChange={handleChange}
                    className="w-16 h-10 text-center border border-gray-300 rounded-xl font-medium outline-none focus:border-pink-500"
                    min="1"
                    max={choose.stock}
                  />
                  <button
                    className="bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer text-xl font-bold transition-colors"
                    onClick={() => count < choose.stock && setCount(count + 1)}
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    (Max: {choose.stock})
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-4 border-t mt-auto">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-colors"
                onClick={() => {
                  setChoose(null);
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl cursor-pointer font-medium shadow-md transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  updateOrder(choose, count);
                  setChoose(null);
                }}
              >
                {modalMode === "add"
                  ? `Add | ${formatRupiah(currentTotalPreview)}`
                  : `Update | ${formatRupiah(currentTotalPreview)}`}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
