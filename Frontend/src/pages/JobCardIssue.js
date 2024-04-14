import React,{useState, useEffect} from 'react'
import axios from "axios";
function JobCardIssue() {
 const [submittedData, setSubmittedData] = useState([]);
     const fetchSubmittedData = async () => {
       try {
         const response = await axios.get(
           "http://localhost:4000/api/product/all",
           {
             withCredentials: true,
           }
         );
         console.log(response);
         setSubmittedData(response.data);
       } catch (error) {
         console.error("Error fetching submitted data:", error);
       }
     };

     useEffect(() => {
       fetchSubmittedData();
     }, []);
  return (
    <div className="  flex flex-col items-center">
      <div className="w-full  mt-6">
        {/* Submitted data table */}
        <div className="mt-12 w-full ">
          <h2 className="text-lg font-semibold mb-4">
            {" "}
            Account Stock IN Submitted Data
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Party Name
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
                      {dataItem.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.kg}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.meter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.roll}
                    </td>
                    {/* Add cells for other fields */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCardIssue