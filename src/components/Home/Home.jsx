import drinkBlack from "../../assets/icons/drink-black.svg";
import drink from "../../assets/icons/drink.svg";
import foodsBlack from "../../assets/icons/foods-black.svg";
import foods from "../../assets/icons/foods.svg";

import enokiPng from "../../assets/images/enoki.png";
import lidahCuangkiPng from "../../assets/images/lidahCuangki.png";
import miePng from "../../assets/images/mie.png";
import kerupukPng from "../../assets/images/kerupuk.png";
import telurPng from "../../assets/images/telur.png";
import nutrisariPng from "../../assets/images/nutrisari.png";
import mineralWater from "../../assets/images/mineral-water.png";
import kapalApiPng from "../../assets/images/kapalApi.png";
import goodDayPng from "../../assets/images/goodDay.png";
import nasgor1 from "../../assets/images/nasgor1.png";

import "./Home.css";

import { useState } from "react";
import { Modal } from "./Modal";
import { OrderList } from "./OrderList";
import { AnimatePresence, motion } from "framer-motion";
import { StockCounter } from "./StockCounter";
import { formatRupiah } from "../helper/FormatRupiah";

export function Home() {
  const [isActive, setIsActive] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const [count, setCount] = useState(1);
  const [choose, setChoose] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    { id: "all", label: "All", icon: foods, iconActive: foodsBlack },
    { id: "nasgor", label: "Nasi Goreng", icon: foods, iconActive: foodsBlack },
    { id: "seblak", label: "Seblak", icon: foods, iconActive: foodsBlack },
    { id: "drink", label: "Minuman", icon: drink, iconActive: drinkBlack },
  ];

  // Di dalam state menus
  const [menus, setMenus] = useState([
    // Menu Nasi Goreng
    {
      id: 101,
      category: "nasgor",
      label: "Nasi Goreng Anak Macan",
      image: nasgor1,
      price: 15000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
      ],
    },
    {
      id: 102,
      category: "nasgor",
      label: "Nasi Goreng Macan Original",
      image: nasgor1,
      price: 19000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    {
      id: 103,
      category: "nasgor",
      label: "Nasi Goreng Macan Jumbo",
      image: nasgor1,
      price: 29000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    {
      id: 104,
      category: "nasgor",
      label: "Nasi Goreng Macan Bakso Sosis",
      image: nasgor1,
      price: 22000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    {
      id: 105,
      category: "nasgor",
      label: "Nasi Goreng Macan Jengkol",
      image: nasgor1,
      price: 22000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    {
      id: 106,
      category: "nasgor",
      label: "Nasi Goreng Macan Ikan Asin",
      image: nasgor1,
      price: 22000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    {
      id: 107,
      category: "nasgor",
      label: "Nasi Goreng Macan Pete",
      image: nasgor1,
      price: 22000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    {
      id: 108,
      category: "nasgor",
      label: "Nasi Goreng Macan Keju",
      image: nasgor1,
      price: 22000,
      stock: 1000,
      addOns: [
        { id: "a1", label: "Telur Ceplok", price: 5000 },
        { id: "a2", label: "Telur Dadar", price: 5000 },
        { id: "a3", label: "Extra Ayam", price: 5000 },
        { id: "a4", label: "Level 1", price: 0 },
        { id: "a5", label: "Level 2", price: 0 },
        { id: "a6", label: "Level 3", price: 0 },
        { id: "a7", label: "Level 4", price: 4000 },
        { id: "a8", label: "Level 5", price: 5000 },
      ],
    },
    // End Nasi Goreng

    // Menu Seblak
    {
      id: 1,
      category: "seblak",
      label: "Enoki (1 pcs)",
      image: enokiPng,
      price: 2000,
      stock: 100,
    },
    {
      id: 2,
      category: "seblak",
      label: "Lidah (1 pcs)",
      image: lidahCuangkiPng,
      price: 1000,
      stock: 100,
    },
    {
      id: 3,
      category: "seblak",
      label: "Mie (1 pcs)",
      image: miePng,
      price: 1000,
      stock: 100,
    },
    {
      id: 4,
      category: "seblak",
      label: "Kerupuk (1 bks)",
      image: kerupukPng,
      price: 2000,
      stock: 100,
    },
    {
      id: 5,
      category: "seblak",
      label: "Cuangki (3 pcs)",
      image: kerupukPng,
      price: 2000,
      stock: 100,
    },
    {
      id: 6,
      category: "seblak",
      label: "Siomay Goreng (5 pcs)",
      image: kerupukPng,
      price: 2000,
      stock: 100,
    },
    {
      id: 7,
      category: "seblak",
      label: "Telur (1 pcs)",
      image: telurPng,
      price: 3000,
      stock: 200,
      addOns: [
        { id: "t1", label: "Orak-Arik", price: 0 },
        { id: "t2", label: "Dadar", price: 0 },
        { id: "t3", label: "Ceplok", price: 0 },
        { id: "t4", label: "Rebus", price: 0 },
      ],
    },
    // End Seblak

    // Menu Minuman
    {
      id: 8,
      category: "drink",
      label: "Nutrisari",
      image: nutrisariPng,
      price: 5000,
      stock: 300,
    },
    {
      id: 9,
      category: "drink",
      label: "Good Day",
      image: goodDayPng,
      price: 7000,
      stock: 300,
    },
    {
      id: 10,
      category: "drink",
      label: "Kapal Api",
      image: kapalApiPng,
      price: 5000,
      stock: 300,
    },
    {
      id: 11,
      category: "drink",
      label: "Air Putih Botol",
      image: mineralWater,
      price: 3000,
      stock: 300,
    },
    // edn Minuman
  ]);

  // Method Function
  const onChoose = (data) => {
    const isChooseOrder = data.quantity > 0;

    isChooseOrder ? setCount(data.quantity) : setCount(1);

    setIsOpen(true);
    setChoose(data);
  };

  // animation
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

  const filteredMenus =
    isActive === "all"
      ? menus
      : menus.filter((menu) => menu.category === isActive);

  return (
    <>
      <div className="md:col-span-8 col-span-12 p-10 text-black bg-[#F7F9FA] print:hidden">
        <h2 className="md:text-3xl text-2xl mb-10 mt-5 font-semibold">
          Enjoy Working!
        </h2>
        <div className="text-center flex flex-row gap-2 overflow-x-scroll scroll-x-no-bar rounded-2xl">
          {categories.map((item) => (
            <div
              key={item.id}
              className={
                isActive === item.id
                  ? "bg-yellow-300 md:min-w-25 min-w-20 p-3 flex flex-col items-center justify-center rounded-2xl cursor-pointer"
                  : "md:min-w-25 min-w-20 p-3 border border-[#757282] flex flex-col items-center justify-center rounded-2xl text-[#757282] cursor-pointer"
              }
              onClick={() => setIsActive(item.id)}
            >
              <img
                src={isActive === item.id ? item.iconActive : item.icon}
                alt={item.label}
                className="max-w-8"
              />
              <h3>{item.label}</h3>
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center justify-between mt-10">
          <h2 className="md:text-3xl text-2xl">
            <span className="font-medium">Order</span> Menu
          </h2>

          <div className="flex flex-row items-center gap-1 md:text-md text-sm">
            <h3>Sort By</h3>
            <select name="sort" id="sort" className="h-10 font-medium">
              <option value="">Popular</option>
              <option value="">Expensive</option>
            </select>
          </div>
        </div>

        {/* List Menu */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-3 mt-10 text-center items-stretch"
          >
            {filteredMenus.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="h-70 bg-[#F7F9FA] hover:bg-[#edf1f4] rounded-2xl p-5 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center cursor-pointer"
                onClick={() => {
                  onChoose({
                    ...item,
                    selectedAddOns: [],
                    cartId: null,
                  });
                  setModalMode("add");
                }}
              >
                <div className="bg-yellow-200 w-32 h-32 rounded-full p-3 flex justify-center items-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 w-full mt-4 flex flex-col justify-start items-center">
                  <h3 className="text-xl font-medium line-clamp-2">
                    {item.label}
                  </h3>
                  <h4 className="mt-3 text-white bg-pink-600 max-w-130 px-3 py-1 rounded-3xl">
                    {formatRupiah(item.price)} |{" "}
                    <StockCounter value={item.stock} /> stock
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-4 right-6 z-40 md:hidden print:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-pink-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer"
          >
            <span className="text-2xl">🛒</span>

            {orders.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white"
              >
                {orders.length}
              </motion.span>
            )}
          </button>
        </div>

        {/* Overlay + Modal */}
        {isOpen && (
          <Modal
            isOpen={isOpen}
            key={choose?.id || "add-mode"}
            count={count}
            setChoose={setChoose}
            setCount={setCount}
            setIsOpen={setIsOpen}
            setOrders={setOrders}
            choose={choose}
            modalMode={modalMode}
            setMenus={setMenus}
          />
        )}
      </div>

      {/* Order List */}
      <OrderList
        onChoose={onChoose}
        orders={orders}
        setModalMode={setModalMode}
        setOrders={setOrders}
        setMenus={setMenus}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
    </>
  );
}
