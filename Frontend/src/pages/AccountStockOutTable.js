import React, { useState, useEffect } from 'react';

import axios from "axios";
const AccountStockOutTable = () => {


  const [lotNumber, setLotNumber] = useState("");
  const [partyName, setPartyName] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [quality, setQuality] = useState("");
  const [kg, setKg] = useState("");
  const [meter, setMeter] = useState("");
  const [rolls, setRolls] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/accountStockOut",
        { withCredentials: true }
      );
      const data = response.data;
      setPartyName(data.partyName);
      setChallanNumber(data.challanNumber);
      setQuality(data.quality);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    if (!lotNumber || !kg || !meter || !rolls) {
      alert("Please fill all fields.");
      return;
    }

    // Submit data to the table
    const newDataItem = {
      lotNumber: lotNumber,
      partyName: partyName,
      challanNumber: challanNumber,
      quality: quality,
      kg: kg,
      meter: meter,
      rolls: rolls
    }; // Adjust as per your data structure
    setSubmittedData([...submittedData, newDataItem]);

    // Clear form fields after submission
    setLotNumber("");
    setKg("");
    setMeter("");
    setRolls("");
  };
  return (
    <div>
     <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Account Stock Out Submitted Data
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Lot Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Party Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Challan Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Kg
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Meter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Rolls
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submittedData.map((dataItem, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.lotNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.partyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.challanNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.quality}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.kg}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.meter}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.rolls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AccountStockOutTable