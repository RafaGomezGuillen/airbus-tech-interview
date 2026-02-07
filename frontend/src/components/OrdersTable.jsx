import { NoOrders } from "./NoOrders";

export function OrdersTable({ orders, onSelectAircraft }) {
  if (orders.length === 0) {
    return <NoOrders title={"No orders available"} />;
  }

  return (
    <table className="w-full text-sm">
      <thead className="bg-[#00205B] text-white">
        <tr>
          <th className="p-3 text-left">Aircraft SN</th>
          <th className="p-3 text-left">Aircraft Model</th>
          <th className="p-3 text-left">Material PN</th>
          <th className="p-3 text-left">Material Name</th>
          <th className="p-3 text-left">Arrival Date</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o, i) => (
          <tr
            title={`View details for ${o.aircraft_serial}`}
            key={i}
            className="border-b hover:bg-blue-50 cursor-pointer"
            onClick={() => onSelectAircraft(o.aircraft_serial)}
          >
            <td className="p-3 font-medium text-[#005EB8]">
              {o.aircraft_serial}
            </td>
            <td className="p-3">{o.aircraft_model}</td>
            <td className="p-3">{o.material_pn}</td>
            <td className="p-3">{o.material_name}</td>
            <td className="p-3">{o.arrival_date}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  o.status === "Arrived"
                    ? "bg-green-100 text-green-700"
                    : o.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {o.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
