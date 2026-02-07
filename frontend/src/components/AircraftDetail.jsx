export function AircraftDetail({ orders, aircraftSN, onClose }) {
  const aircraftOrders = orders.filter((o) => o.aircraft_serial === aircraftSN);

  return (
    <div className="mt-8 bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#00205B]">
          Aircraft Details — {aircraftSN}
        </h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Material</th>
            <th className="p-2 text-left">PN</th>
            <th className="p-2 text-left">Arrival</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {aircraftOrders.map((o, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{o.material_name}</td>
              <td className="p-2">{o.material_pn}</td>
              <td className="p-2">{o.arrival_date}</td>
              <td className="p-2">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
