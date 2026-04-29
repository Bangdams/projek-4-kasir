import { AnimatePresence, motion } from "framer-motion";

export function Bill() {
  const transactions = [
    {
      id: 1,
      detail: [
        {
          label: "Chess Burger",
          price: "50k",
          quantity: 2,
          total: "100k",
        },
        {
          label: "Burito",
          price: "30k",
          quantity: 2,
          total: "60k",
        },
      ],
      grandTotal: "160k",
      paymentMethod: "cash",
      date: "2026-03-24",
    },
    {
      id: 2,
      detail: [
        {
          label: "Chess Burger",
          price: "50k",
          quantity: 2,
          total: "100k",
        },
      ],
      grandTotal: "100k",
      paymentMethod: "cash",
      date: "2026-03-25",
    },
    {
      id: 3,
      detail: [
        { label: "Pizza", price: "40k", quantity: 1, total: "40k" },
        { label: "Fanta", price: "10k", quantity: 2, total: "20k" },
      ],
      grandTotal: "60k",
      paymentMethod: "QRIS",
      date: "2026-03-25",
    },
    {
      id: 4,
      detail: [
        { label: "Nasi Goreng", price: "35k", quantity: 2, total: "70k" },
      ],
      grandTotal: "70k",
      paymentMethod: "E-Wallet",
      date: "2026-03-26",
    },
    {
      id: 5,
      detail: [
        { label: "Burito", price: "30k", quantity: 3, total: "90k" },
        { label: "Sprite", price: "12k", quantity: 2, total: "24k" },
      ],
      grandTotal: "114k",
      paymentMethod: "Cash",
      date: "2026-03-26",
    },
    {
      id: 6,
      detail: [
        { label: "Chess Burger", price: "50k", quantity: 1, total: "50k" },
        { label: "French Fries", price: "20k", quantity: 2, total: "40k" },
      ],
      grandTotal: "90k",
      paymentMethod: "QRIS",
      date: "2026-03-27",
    },
    {
      id: 7,
      detail: [
        { label: "Pizza", price: "40k", quantity: 2, total: "80k" },
        { label: "Coca Cola", price: "15k", quantity: 1, total: "15k" },
      ],
      grandTotal: "95k",
      paymentMethod: "E-Wallet",
      date: "2026-03-27",
    },
    {
      id: 8,
      detail: [
        { label: "Nasi Goreng", price: "35k", quantity: 1, total: "35k" },
        { label: "Burito", price: "30k", quantity: 1, total: "30k" },
        { label: "Fanta", price: "10k", quantity: 1, total: "10k" },
      ],
      grandTotal: "75k",
      paymentMethod: "Cash",
      date: "2026-03-28",
    },
    {
      id: 9,
      detail: [
        { label: "Chess Burger", price: "50k", quantity: 2, total: "100k" },
        { label: "French Fries", price: "20k", quantity: 1, total: "20k" },
      ],
      grandTotal: "120k",
      paymentMethod: "QRIS",
      date: "2026-03-28",
    },
    {
      id: 10,
      detail: [{ label: "Pizza", price: "40k", quantity: 3, total: "120k" }],
      grandTotal: "120k",
      paymentMethod: "Cash",
      date: "2026-03-29",
    },
    {
      id: 11,
      detail: [
        { label: "Burito", price: "30k", quantity: 2, total: "60k" },
        { label: "Sprite", price: "12k", quantity: 1, total: "12k" },
      ],
      grandTotal: "72k",
      paymentMethod: "E-Wallet",
      date: "2026-03-29",
    },
    {
      id: 12,
      detail: [
        { label: "Nasi Goreng", price: "35k", quantity: 2, total: "70k" },
        { label: "Coca Cola", price: "15k", quantity: 2, total: "30k" },
      ],
      grandTotal: "100k",
      paymentMethod: "Cash",
      date: "2026-03-30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // jeda antar card
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="col-span-10 bg-[#F7F9FA] p-10 text-black">
      <div className="mb-5">
        <h2 className="text-3xl mt-5 mb-10 font-medium">All Bill</h2>
        <div className="flex justify-between">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Code"
            className="border border-pink-600 rounded-2xl px-2"
          />
          <input type="date" />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex gap-5 flex-wrap"
        >
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              variants={cardVariants}
              className="w-50 min-h-70 shadow-[0_10px_20px_rgba(0,0,0,0.15)] rounded-2xl p-5 flex flex-col justify-between gap-5 bg-pink-600 hover:bg-pink-640 cursor-pointer text-white"
            >
              <div>
                <div className="text-center mb-5 font-semibold">
                  <h3>Bill</h3>
                  <p className="text-sm">{transaction.id}</p>
                  <p className="text-sm">{transaction.date}</p>
                </div>
                <p>Detail : </p>
                <div className="flex flex-col gap-3 mb-3">
                  {transaction.detail.map((detail) => (
                    <div>
                      <p>- {detail.label}</p>
                      <div className="flex gap-3 items-center">
                        <p className="ml-3">{detail.price}</p>
                        <p>| x{detail.quantity} |</p>
                        <p>{detail.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-semibold">
                <p>Total : 200k</p>
                <p>Payment : Cash</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
