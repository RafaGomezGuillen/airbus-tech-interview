import { useEffect, useState } from "react";
import AirbusLogo from "./assets/airbus-logo.svg";

// API
import { getOrders } from "./api/orders.api";
import { uploadFile } from "./api/upload.api";
import { getMaterials } from "./api/materials.api";
import { getAircrafts } from "./api/aircrafts.api";

// Components
import { OrdersTable } from "./components/OrdersTable";
import { MaterialsTable } from "./components/MaterialsTable";
import { AircraftsTable } from "./components/AircraftsTable";
import { AircraftDetail } from "./components/AircraftDetail";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("orders");
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);

  const [selectedAircraft, setSelectedAircraft] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getOrders();
    setOrders(res);
    setLoading(false);
  };

  const fetchMaterials = async () => {
    setLoading(true);
    const res = await getMaterials();
    setMaterials(res);
    setLoading(false);
  };

  const fetchAircrafts = async () => {
    setLoading(true);
    const res = await getAircrafts();
    setAircrafts(res);
    setLoading(false);
  };

  useEffect(() => {
    if (view === "orders") fetchOrders();
    else if (view === "materials") fetchMaterials();
    else if (view === "aircrafts") fetchAircrafts();
  }, [view]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await uploadFile(file);
    setShowUpload(false);
    setFile(null);

    if (view === "orders") fetchOrders();
    else if (view === "materials") fetchMaterials();
    else if (view === "aircrafts") fetchAircrafts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={AirbusLogo} alt="Airbus Logo" className="h-8 sm:h-10" />
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00205B]">
            Aircraft Materials Orders
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            title="View Orders"
            onClick={() => setView("orders")}
            className={`px-3 py-1 rounded ${
              view === "orders"
                ? "bg-[#00205B] text-white"
                : "bg-white border text-[#00205B]"
            }`}
          >
            Orders
          </button>
          <button
            title="View Materials"
            onClick={() => setView("materials")}
            className={`px-3 py-1 rounded ${
              view === "materials"
                ? "bg-[#00205B] text-white"
                : "bg-white border text-[#00205B]"
            }`}
          >
            Materials
          </button>
          <button
            title="View Aircrafts"
            onClick={() => setView("aircrafts")}
            className={`px-3 py-1 rounded ${
              view === "aircrafts"
                ? "bg-[#00205B] text-white"
                : "bg-white border text-[#00205B]"
            }`}
          >
            Aircrafts
          </button>
          <button
            title="Upload Excel File"
            onClick={() => setShowUpload(true)}
            className="px-3 py-1 bg-[#005EB8] text-white rounded hover:bg-[#00205B]"
          >
            Upload Excel
          </button>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-500">Loading {view}...</p>
        ) : view === "orders" ? (
          <OrdersTable orders={orders} onSelectAircraft={setSelectedAircraft} />
        ) : view === "materials" ? (
          <MaterialsTable materials={materials} />
        ) : view === "aircrafts" ? (
          <AircraftsTable aircrafts={aircrafts} />
        ) : null}
      </div>

      {/* AIRCRAFT DETAIL */}
      {selectedAircraft && view === "orders" && (
        <AircraftDetail
          orders={orders}
          aircraftSN={selectedAircraft}
          onClose={() => setSelectedAircraft(null)}
        />
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded shadow p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-[#00205B]">
              Upload Excel File
            </h2>
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                title="Cancel Upload"
                onClick={() => setShowUpload(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                title="Confirm Upload"
                onClick={handleUpload}
                className="px-3 py-1 bg-[#005EB8] text-white rounded hover:bg-[#00205B]"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
