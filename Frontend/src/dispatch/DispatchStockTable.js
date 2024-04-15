import React, { useState, useEffect } from 'react';
import axios from "axios";

const DispatchStockTable = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [quality, setQuality] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/dispatch",
        { withCredentials: true }
      );
      const data = response.data;
      setPartyName(data.partyName);
      setChallanNumber(data.challanNumber);
      setLotNumber(data.lotNumber);
      setQuality(data.quality);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Dispatch Stock In Submitted Data
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Party Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Challan Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Lot Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Quality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Karigrar Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Kg
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                Meter
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submittedData.map((dataItem, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.partyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.challanNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.lotNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.quality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.karigrarName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.kg}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dataItem.meter}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DispatchStockTable