import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

function GreyStockIn() {
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/all", {
        withCredentials: true,
      });
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching submitted data:", error);
    }
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const handleAddButtonClick = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mt-6">
        <div className="mt-12 w-full">
          <h2 className="text-lg font-semibold mb-4">Grey Stock</h2>
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
                    Action
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                        onClick={() => handleAddButtonClick(dataItem)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedData} />
    </div>
  );
}

export default GreyStockIn;
