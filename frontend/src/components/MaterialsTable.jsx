import { NoOrders } from "./NoOrders";

export function MaterialsTable({ materials }) {
  if (materials.length === 0) {
    return <NoOrders title={"No materials available"} />;
  }

  return (
    <table className="w-full text-sm">
      <thead className="bg-[#00205B] text-white">
        <tr>
          <th className="p-3 text-left">PN</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Type</th>
          <th className="p-3 text-left">Weight</th>
        </tr>
      </thead>
      <tbody>
        {materials.map((m, i) => (
          <tr key={i} className="border-b">
            <td className="p-3">{m.pn}</td>
            <td className="p-3">{m.name}</td>
            <td className="p-3">{m.type}</td>
            <td className="p-3">{m.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
