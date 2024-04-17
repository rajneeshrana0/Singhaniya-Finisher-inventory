import React, { useState, useEffect } from 'react';
import axios from "axios";

const AccountStockOut = () => {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Account Stock Out
      </h1>

      <div className="mt-8 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700">
              Lot Number
            </label>
            <input
              type="text"
              id="lotNumber"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="partyName" className="block text-sm font-medium text-gray-700">
              Party Name
            </label>
            <input
              type="text"
              id="partyName"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={partyName}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="challanNumber" className="block text-sm font-medium text-gray-700">
              Challan Number
            </label>
            <input
              type="text"
              id="challanNumber"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={challanNumber}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700">
              Quality
            </label>
            <input
              type="text"
              id="quality"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={quality}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="kg" className="block text-sm font-medium text-gray-700">
              Kg
            </label>
            <input
              type="text"
              id="kg"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="meter" className="block text-sm font-medium text-gray-700">
              Meter
            </label>
            <input
              type="text"
              id="meter"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={meter}
              onChange={(e) => setMeter(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rolls" className="block text-sm font-medium text-gray-700">
              Rolls
            </label>
            <input
              type="text"
              id="rolls"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={rolls}
              onChange={(e) => setRolls(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

 
    </div>
  );
};

export default AccountStockOut;
