import React, { useState } from 'react';
import axios from "axios";
const GreyStockIn = () => {
  const [lotNumber, setLotNumber] = useState("");
  const [partyName, setPartyName] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [quality, setQuality] = useState("");
  const [quantity, setQuantity] = useState("");
  const [kg, setKg] = useState("");
  const [meter, setMeter] = useState("");
  const [roll, setRoll] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [processTypes, setProcessTypes] = useState([]);



  // const handleProcessTypeChange = (e) => {
  //   const selectedProcessType = e.target.value;
  //   if (processTypes.includes(selectedProcessType)) {
  //     setProcessTypes(processTypes.filter(type => type !== selectedProcessType));
  //   } else {
  //     setProcessTypes([...processTypes, selectedProcessType]);
  //   }
  // };

  const handleLotNumberChange = (e) => {
    setLotNumber(e.target.value);
  };

  const handleLotNumberSubmit = () => {
    // Check if the lot number matches a predefined value
    if (lotNumber === "123") { // Replace "123" with the actual predefined lot number
      // If it matches, fill in Party Name, Challan Number, and Quality
      setPartyName("John Doe"); // Example party name
      setChallanNumber("C123"); // Example challan number
      setQuality("High"); // Example quality
    } else {
      // If it doesn't match, clear Party Name, Challan Number, and Quality
      setPartyName("");
      setChallanNumber("");
      setQuality("");
    }
  };

  const handleSubmit = async () => {
    // Call the generateLotNumber function to generate the lot number


    

    try {
      // Send the form data to the API
      const response = await axios.post(
        "http://localhost:4000/api/product/add",
        {
          selectedOption,
          challanNumber,
          quantity,
          kg,
          meter,
          roll,          
        },
        {
          withCredentials: true 
        }
      );
    
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    
    
  };


  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Grey Stock In
      </h1>
      <div className='w-full max-w-md mt-6'>

      <div className="mt-8">
        <label htmlFor="lotNumber" className="text-gray-700 font-semibold">Enter Lot Number:</label>
        <input
          type="text"
          id="lotNumber"
          className="border border-gray-300 rounded-md p-2 ml-2"
          value={lotNumber}
          onChange={handleLotNumberChange}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 ml-2 rounded-md"
          onClick={handleLotNumberSubmit}
        >
          Submit
        </button>
      </div>

      <div className="flex flex-col  mt-4">
          <label className="text-gray-700 font-semibold">Party Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mt-1"
            value={partyName}
            readOnly
          />
        </div>

        <div className="flex flex-col  mt-4">
          <label className="text-gray-700 font-semibold">Challan Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mt-1"
            value={challanNumber}
            readOnly
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-gray-700 font-semibold">Quality:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mt-1"
            value={quality}
            readOnly
          />
        </div>
     
        <div className="mt-4">
          <label htmlFor="kg" className="block text-sm font-medium text-gray-700">
            Kg
          </label>
          <input
            type="text"
            id="kg"
            name="kg"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Kg"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="meter" className="block text-sm font-medium text-gray-700">
            Meter
          </label>
          <input
            type="text"
            id="meter"
            name="meter"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Meter"
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="roll" className="block text-sm font-medium text-gray-700">
            Roll
          </label>
          <input
            type="text"
            id="roll"
            name="roll"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Roll"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-gray-700 font-semibold">Select Process Types:</label>
          <div className="mt-1">
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                value="half"
                checked={processTypes.includes("half")}
              />
              <span className="ml-2">Half Process</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                value="full"
                checked={processTypes.includes("full")}
              />
              <span className="ml-2">Full Process</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                value="finish"
                checked={processTypes.includes("finish")}
              />
              <span className="ml-2">Finish</span>
            </label>
          </div>
        </div>
      
        <div className="mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          >
            Submit
          </button>
        </div>
    </div>
    </div>
  );
};

export default GreyStockIn;
