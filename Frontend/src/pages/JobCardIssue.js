import React, { useState } from "react";

const LotNumberGenerator = () => {
  // State for storing the generated lot number
  const [lotNumber, setLotNumber] = useState("");

  // Function to generate lot numbers
  const generateLotNumber = () => {
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()]; // Get current month

    // Get the last generated lot number from the state
    const lastGeneratedLotNumber = lotNumber.split(" ");
    let lastNumber = 0;

    // If a lot number was generated previously, extract the number part
    if (lastGeneratedLotNumber.length === 2) {
      lastNumber = parseInt(lastGeneratedLotNumber[1]);
    }

    // Increment the last generated number
    const newLotNumber = `${currentMonth} ${lastNumber + 1}`;

    // Update the state with the new lot number
    setLotNumber(newLotNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <button
        type="button"
        onClick={generateLotNumber}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Generate Lot Number
      </button>
      {lotNumber && (
        <div className="mt-4">
          <p className="text-gray-700">Generated Lot Number: {lotNumber}</p>
        </div>
      )}
    </div>
  );
};

export default LotNumberGenerator;
