import { CashierPerformanceChart } from "./CashierPerformanceChart";
import { PaymentMethodChart } from "./PaymentMethodChart";
import { SalesTrendChart } from "./SalesTrendChart";
import { TransactionTable } from "./TransactionTable";

export function Monitoring() {
  const transactions = [
    {
      id: 1,
      date: "2025-12-03",
      cashier: "Mawar",
      method: "Cash",
      status: "SUCCEEDED",
      total: 100000,
    },
    {
      id: 2,
      date: "2025-12-04",
      cashier: "Mawar",
      method: "Cash",
      status: "FAILED",
      total: 20000,
    },
  ];

  return (
    <div className="col-span-11 p-10 text-black bg-[#F7F9FA]">
      <h2 className="text-3xl mb-10 mt-5 font-semibold">Monitoring</h2>

      <SalesTrendChart />

      <div className="grid grid-cols-2 gap-6">
        <PaymentMethodChart />
        <CashierPerformanceChart />
      </div>

      <div className="mt-6">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
