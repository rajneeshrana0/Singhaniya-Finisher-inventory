import React, { useState, useEffect } from 'react';
import axios from "axios";

const DispatchStockIn = () => {
  const [partyName, setPartyName] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [quality, setQuality] = useState("");
  const [karigrarName, setKarigrarName] = useState("");
  const [kg, setKg] = useState("");
  const [meter, setMeter] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

 
  const handleSubmit = () => {
    if (!karigrarName || !kg || !meter) {
      alert("Please fill all fields.");
      return;
    }

    // Submit data to the table
    const newDataItem = {
      partyName: partyName,
      challanNumber: challanNumber,
      lotNumber: lotNumber,
      quality: quality,
      karigrarName: karigrarName,
      kg: kg,
      meter: meter
    }; // Adjust as per your data structure
    setSubmittedData([...submittedData, newDataItem]);

    // Clear form fields after submission
    setKarigrarName("");
    setKg("");
    setMeter("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Dispatch Stock In
      </h1>

      <div className="mt-8 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-6">
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
            <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700">
              Lot Number
            </label>
            <input
              type="text"
              id="lotNumber"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={lotNumber}
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
            <label htmlFor="karigrarName" className="block text-sm font-medium text-gray-700">
              Karigrar Name
            </label>
            <input
              type="text"
              id="karigrarName"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={karigrarName}
              onChange={(e) => setKarigrarName(e.target.value)}
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

export default DispatchStockIn;
