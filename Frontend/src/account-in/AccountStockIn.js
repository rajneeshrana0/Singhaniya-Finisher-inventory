import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [kg, setKg] = useState("");
  const [meter, setMeter] = useState("");
  const [roll, setRoll] = useState("");
  const [lotNumber, setLotNumber] = useState("");

  const options = ["Rajneesh Rana", "Liza Ahuja", "Nitish Kumar"];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const notify = () => toast("Data Saved!");
  const handleSubmit = async () => {
    try {
      if (
        !selectedOption ||
        !challanNumber ||
        !quantity ||
        !kg ||
        !meter ||
        !roll
      ) {
        toast.error("Please fill in all fields.");
        return;
      }
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
          withCredentials: true,
        }
      );

      console.log(response);
      notify();
      console.log("Data saved successfully:", response.data);

      setSelectedOption("");
      setChallanNumber("");
      setQuantity("");
      setKg("");
      setMeter("");
      setRoll("");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data. Please try again later.");
    }
  };

  // const dataToShow = submittedData.filter(dataItem => dataItem.selectedOption !== selectedOption);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center overflow-hidden">
        <h1 className="text-[64px] font-medium font-login text-center text-white shadow-lg bg-gray rounded-md p-6  transition-transform duration-300 w-[1370px] h-[117px]">
          Account Stock In
        </h1>
        <div className="form-data-start w-full max-w-md mt-6">
          <div className="relative inline-block text-left w-full mb-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                onClick={toggleDropdown}
              >
                <span className="text-lg font-bold">Party Name</span>
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => setIsOpen(false)}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                  </Transition.Child>
                  <span className="inline-block h-screen align-middle">
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Select Party Name
                      </Dialog.Title>
                      <div className="mt-4">
                        <div className="relative">
                          <input
                            type="text"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        {options
                          .filter((option) =>
                            option
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                            >
                              {option}
                            </button>
                          ))}
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
          {/* Display selected option */}
          {selectedOption && (
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Selected Party Name: {selectedOption}
              </p>
            </div>
          )}
          {/* Input Fields */}
          <div className="border-login border-[1px] rounded-xl overflow-hidden">
            <div className="mt-4 ">
              <label
                htmlFor="challanNumber"
                className="block text-gray-700 ml-4 font-login text-lg"
              >
                Challan Number
              </label>
              <input
                type="text"
                id="challanNumber"
                name="challanNumber"
                className="mt-4 ml-4 mb-4 block w-[300px] placeholder:font-login text-[24px] border-gray-300 rounded-xs shadow-black shadow-sm focus:ring-darkgray focus:border-darkgray sm:text-sm "
                placeholder="Your Answer"
                value={challanNumber}
                onChange={(e) => setChallanNumber(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full overflow-hidden"></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="quantity"
                className="block ml-4 font-login text-lg text-gray-700"
              >
                Quality
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                className="mt-4 block mb-4 ml-4 w-[300px] rounded-xs shadow-black shadow-sm border-gray-300 rounded-xs focus:ring-darkgray focus:border-darkgray sm:text-sm placeholder:font-login text-[24px]"
                placeholder="Your answer"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="kg"
                className="block ml-4 text-lg font-login text-gray-700"
              >
                KG
              </label>
              <input
                type="text"
                id="kg"
                name="kg"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs focus:ring-darkgray focus:border-darkgray sm:text-sm placeholder:font-login text-[24px]  shadow-black shadow-sm"
                placeholder="Your answer"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full"></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="meter"
                className="block text-lg ml-4 font-login text-gray-700"
              >
                Meter
              </label>
              <input
                type="text"
                id="meter"
                name="meter"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs placeholder:font-login text-[24px] focus:ring-darkgray focus:border-darkgray sm:text-sm shadow-black shadow-sm"
                placeholder="Your answer"
                value={meter}
                onChange={(e) => setMeter(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="roll"
                className="block text-lg font-login ml-4 text-gray-700"
              >
                Roll
              </label>
              <input
                type="text"
                id="roll"
                name="roll"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs shadow-sm  placeholder:font-login text-[24px] sm:text-sm shadow-black focus:ring-darkgray focus:border-darkgray"
                placeholder="Your answer"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex mt-4 justify-center px-[65px] py-[10px] text-[18px] font-extrabold font-forget text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:border-2"
            >
              Submit
            </button>
          </div>

          {lotNumber && (
            <div className="mt-4">
              <p className="text-gray-700">Generated Lot Number: {lotNumber}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
