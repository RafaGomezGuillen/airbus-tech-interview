export const NoOrders = ({title}) => {
  return (
    <div className="flex min-h-[88vh] w-full flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-blue-50 p-4">
        <svg
          className="h-10 w-10 text-[#005EB8]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-[#00205B]">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        There are no aircraft material orders yet. Upload an Excel file to run
        the ETL process and populate the database.
      </p>
    </div>
  );
};
