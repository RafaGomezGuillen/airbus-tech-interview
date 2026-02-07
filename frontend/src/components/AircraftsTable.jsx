import { NoOrders } from "./NoOrders";

export function AircraftsTable({ aircrafts }) {
  if (aircrafts.length === 0) {
    return <NoOrders title={"No aircrafts available"} />;
  }

  return (
    <table className="w-full text-sm">
      <thead className="bg-[#00205B] text-white">
        <tr>
          <th className="p-3 text-left">Serial Number</th>
          <th className="p-3 text-left">Model</th>
          <th className="p-3 text-left">Manufacturer</th>
          <th className="p-3 text-left">Capacity</th>
          <th className="p-3 text-left">Configuration</th>
        </tr>
      </thead>
      <tbody>
        {aircrafts.map((a, i) => (
          <tr key={i} className="border-b">
            <td className="p-3">{a.serial_number}</td>
            <td className="p-3">{a.model}</td>
            <td className="p-3">{a.manufacturer}</td>
            <td className="p-3">{a.capacity}</td>
            <td className="p-3">{a.configuration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
