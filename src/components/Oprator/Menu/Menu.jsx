export function Menu() {
  return (
    <div className="col-span-11 bg-[#F7F9FA] p-10 text-black print:hidden">
      <h2 className="text-3xl mt-5 font-medium">Management Menu</h2>

      <div className="min-h-30 rounded-xl p-5 mt-8 shadow-md">
        <p>Hello</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black">No</th>
              <th className="border border-black">Name</th>
              <th className="border border-black">Image</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Stock</th>
              <th className="border border-black">Stock</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-black p-2">1</td>
              <td className="border border-black p-2">Burger</td>
              <td className="border border-black p-2">burger.jpg</td>
              <td className="border border-black p-2">Rp. 200,000</td>
              <td className="border border-black p-2">50</td>
              <td className="border border-black text-white p-2 w-50">
                <button className="cursor-pointer bg-[#198754] w-20 rounded-2xl shadow-md mr-3">
                  Edit
                </button>
                <button className="cursor-pointer bg-[#dc3545] w-20 rounded-2xl shadow-md">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
