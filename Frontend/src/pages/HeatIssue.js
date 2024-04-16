import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HeatIssue = () => {
  const [completed, setCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/purchase/getHalfProcessData",
        { withCredentials: true }
      );
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching submitted data:", error);
    }
  };

  const handleToggleCompletion = () => {
    if (!lotNumber) {
      alert("Please enter Lot Number first.");
      return;
    }

    setCompleted(!completed);
    if (!completed) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCompletionDate(formattedDate);
    }
  };

 const handleSubmit = async () => {
   if (!lotNumber) {
     toast.error("Please enter Lot Number first.");
     return;
   }

   try {
  
     const response = await axios.post(
       "http://localhost:4000/api/sales/add",
       { lotNumber },
       { withCredentials: true }
     );

  
     if (response.status === 201) {
      
       toast.success("Lot number submitted successfully!");
   
       const newDataItem = {
         selectedOption: "",
         quantity: "",
         kg: "",
         meter: "",
         roll: "",
         completionDate: completionDate,
       };
       setSubmittedData([...submittedData, newDataItem]);
  
       setLotNumber("");
       setCompleted(false);
       setCompletionDate("");
     } else {
 
       toast.error("Error submitting lot number. Please try again.");
     }
   } catch (error) {
     console.error("Error submitting lot number:", error);
   
     toast.error("Error submitting lot number. Please try again.");
   }
 };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Heat Management
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="lotNumber"
            className="block text-sm font-medium text-gray-700"
          >
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
      </div>

      <div className="mt-8 flex items-center">
        <input
          type="checkbox"
          id="completed"
          className="h-6 w-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={completed}
          onChange={handleToggleCompletion}
          disabled={!lotNumber}
        />
        <label
          htmlFor="completed"
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          {lotNumber ? "Work Completed" : "Enter Lot Number first"}
        </label>
      </div>

      {completed && (
        <div className="mt-4">
          <label
            htmlFor="completionDate"
            className="block text-sm font-medium text-gray-700"
          >
            Completion Date
          </label>
          <input
            type="text"
            id="completionDate"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={completionDate}
            readOnly
          />
        </div>
      )}

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="mt-12 w-full">
        <h2 className="text-lg font-semibold mb-4">Heat Issue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-800 text-white">
              <tr>
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
                  Roll
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Process
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Lot Number
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
                    {dataItem.selectedOption}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.challanNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{dataItem.kg}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.meter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.roll}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Array.isArray(dataItem.processTypes)
                      ? dataItem.processTypes.join(", ")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {dataItem.lotNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeatIssue;
