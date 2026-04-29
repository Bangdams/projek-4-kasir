import { formatRupiah } from "../helper/FormatRupiah";

export function Struck({
  orders,
  customerName,
  grandTotal,
  active,
  change,
  parsedCash,
  spicyLevel,
  seblakNote,
}) {
  const hasSeblak = orders.some((item) => item.category === "seblak");
  const hasNasgor = orders.some((item) => item.category === "nasgor");

  let brandName = "MACAN FOOD COURT";
  if (hasSeblak && !hasNasgor) {
    brandName = "SEBLAK MACAN";
  } else if (hasNasgor && !hasSeblak) {
    brandName = "NASI GORENG MACAN";
  } else if (hasSeblak && hasNasgor) {
    brandName = "NASGOR & SEBLAK MACAN";
  }

  return (
    <div className="hidden print:block w-[58mm] font-mono text-black text-[10px] px-2 pb-4 leading-tight wrap-break-word">
      <div className="text-center mb-1">
        <h1 className="text-sm font-bold">{brandName}</h1>
        <p>Jl. Sukaraja - Mangunreja, Kec. Mangunreja</p>
        <p>{new Date().toLocaleString()}</p>
      </div>

      <p className="text-center mb-1">---------------------------------</p>

      {/* Area Informasi Pelanggan & Catatan Global */}
      {(customerName || hasSeblak) && (
        <>
          <div className="mb-1 text-left font-bold">
            {customerName && <p>Pelanggan: {customerName}</p>}

            {hasSeblak && (
              <>
                <p className="text-pink-600 font-extrabold uppercase mt-1">
                  &gt;&gt; {spicyLevel} &lt;&lt;
                </p>
                {seblakNote && (
                  <p className="text-gray-800 font-bold mt-1 uppercase">
                    * {seblakNote}
                  </p>
                )}
              </>
            )}
          </div>
          <p className="text-center mb-1">---------------------------------</p>
        </>
      )}

      <div className="mb-2 border-b border-dashed border-black pb-1">
        {orders.map((item) => (
          <div key={item.cartId || item.id} className="mb-2">
            <p className="wrap-break-word font-bold">{item.label}</p>

            {item.selectedAddOns && item.selectedAddOns.length > 0 && (
              <div className="pl-2 text-[9px] mb-1">
                {item.selectedAddOns.map((addon) => (
                  <div key={addon.id} className="flex justify-between">
                    <p className="wrap-break-word w-3/4">- {addon.label}</p>
                    <p className="w-1/4 text-right">
                      {/* Pastikan add-on price ditangani dengan benar */}
                      {addon.price && addon.price !== "0K" && addon.price !== 0
                        ? `+${addon.price}`
                        : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {item.note && (
              <div className="pl-2 text-[9px] mb-1 italic font-semibold">
                * Catatan: {item.note}
              </div>
            )}

            <div className="flex justify-between gap-1 mt-1">
              <p>
                {item.quantity}x {formatRupiah(item.price)}
              </p>
              <p className="font-bold">{formatRupiah(item.total)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bagian kalkulasi distandarkan ke formatRupiah dan Bahasa Indonesia */}
      <div className="flex justify-between font-bold text-[11px] mt-1 border-t border-black pt-1">
        <p>TOTAL</p>
        <p>{formatRupiah(grandTotal)}</p>
      </div>

      <div className="flex justify-between mt-1">
        <p>BAYAR ({active})</p>
        <p>
          {active === "Cash"
            ? formatRupiah(parsedCash)
            : formatRupiah(grandTotal)}
        </p>
      </div>

      {active === "Cash" && (
        <div className="flex justify-between">
          <p>KEMBALI</p>
          <p>{change > 0 ? formatRupiah(change) : "Rp 0"}</p>
        </div>
      )}

      <p className="text-center mt-2 mb-1">---------------------------------</p>

      <div className="text-center mt-2">
        <p>Terima Kasih</p>
        <p className="text-[9px]">Ganas Di Rasa Nagih Di Lidah</p>
      </div>

      <div className="text-center text-[8px] text-gray-300">-</div>
      <div className="text-center text-[8px] text-gray-300">-</div>
    </div>
  );
}
