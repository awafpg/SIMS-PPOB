import { useState } from "react";
import { useHistoryQuery } from "../../Store/transaction/transactionReducer";
import { Spinner } from "@nextui-org/react";
import { formatedNumber } from "../../Store/store";

export const History = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day} ${month} ${year} ${hours}:${minutes} WIB`;
  };
  //   const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5; // Number of items to fetch each time

  // Fetch history data using offset and limit
  const { data, error, isLoading } = useHistoryQuery({
    offset,
    limit,
  });
  console.log("🚀 ~ History ~ data:", data);

  const handleShowMore = () => {
    setOffset(offset + limit); // Increment offset by limit
  };

  if (error) return <p>Error loading history.</p>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />;
      </div>
    );

  return (
    <>
      <div>
        <div className="px-10">
          {data?.data.records.map((transaction, index) => (
            <div key={index} className="flex flex-col py-1">
              <div className="border-2 rounded p-2 px-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <p
                      className={`${
                        transaction.transaction_type === "PAYMENT"
                          ? "text-red-500"
                          : "text-green-400"
                      } text-2xl font-semibold`}
                    >
                      {transaction.transaction_type === "PAYMENT" ? "-" : "+"}
                      Rp.
                      {" " + formatedNumber(transaction.total_amount)}
                    </p>
                    <p className="text-[12px]">
                      {formatDate(transaction.created_on)}
                    </p>
                  </div>
                  <div className="text-[12px]">{transaction.description}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center text-[#f42c1c]">
            <button onClick={handleShowMore}>Show More</button>
          </div>
        </div>
      </div>
    </>
  );
};
