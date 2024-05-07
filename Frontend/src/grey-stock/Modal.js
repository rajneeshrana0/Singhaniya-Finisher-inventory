import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

function Modal({ isOpen, onClose, data }) {
  const [selectedQualities, setSelectedQualities] = useState([]);
  const [qualityOptions, setQualityOptions] = useState([
    { value: "Option 1", label: "Option 1" },
    { value: "Option 1", label: "Option 1" },
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    // Add more quality options here
  ]);
  const [previewData, setPreviewData] = useState(null);

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  if (!isOpen) return null;

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/purchase/add",
        {
          ...values,
          selectedOption: data.selectedOption,
          challanNumber: data.challanNumber,
          quantity: data.quantity,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Form data submitted:", response.data);
      toast.success("Grey successfully added");
      onClose(); 
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error adding Grey");
    }
  };


  const handleAddQuality = () => {
    setSelectedQualities([...selectedQualities, ""]);
  };

  const handleRemoveQuality = (index) => {
    const updatedQualities = [...selectedQualities];
    updatedQualities.splice(index, 1);
    setSelectedQualities(updatedQualities);
  };

  const handleShowPreview = (values) => {
    // Create an array of plain JavaScript objects containing selected quality data
    const selectedQualitiesPreview = selectedQualities.map((quality) => ({
      quality: quality.value, // Extract the value of the selected option
      kg: values.kg,
      meter: values.meter,
      roll: values.roll,
    }));

    // Create the preview data object
    const previewData = {
      kg: values.kg,
      meter: values.meter,
      roll: values.roll,
      selectedQualities: selectedQualitiesPreview,
      // Add other form data you want to include in the preview
    };

    setPreviewData(previewData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl mx-auto flex">
        <div className="flex flex-col justify-between p-5 w-1/2 bg-indigo-600 rounded-l-lg">
          <div className="p-6 border-b border-gray-300">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Grey Stock
            </h3>
            <div className="mt-6 bg-gray-200 rounded-lg p-6">
              <div className="text-gray-700 font-semibold mb-4">
                <span className="text-gray-900 mr-2">Selected Option:</span>
                <span className="text-white">{data.selectedOption}</span>
              </div>
              <div className="text-gray-700 font-semibold mb-4">
                <span className="text-gray-900 mr-2">Challan Number:</span>
                <span className="text-white">{data.challanNumber}</span>
              </div>
              <div className="text-gray-700 font-semibold">
                <span className="text-gray-900 mr-2">Quality:</span>
                <span className="text-white">{data.quality}</span>
              </div>
              <div className="mt-4">
                {selectedQualities.map((quality, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Select
                      className="w-64"
                      options={qualityOptions}
                      placeholder="Select Quality"
                      onChange={(option) => {
                        const updatedQualities = [...selectedQualities];
                        updatedQualities[index] = option;
                        setSelectedQualities(updatedQualities);
                      }}
                      value={quality}
                    />
                    <button
                      className="text-red-600 focus:outline-none"
                      onClick={() => handleRemoveQuality(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 focus:outline-none"
                  onClick={handleAddQuality}
                >
                  Add Quality
                </button>
              </div>
            </div>
          </div>

          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Formik
          initialValues={{ kg: "", meter: "", roll: "", processTypes: [] }}
          validate={(values) => {
            const errors = {};
            if (!values.kg) {
              errors.kg = "Required";
            }
            if (!values.meter) {
              errors.meter = "Required";
            }
            if (!values.roll) {
              errors.roll = "Required";
            }
            if (values.processTypes.length === 0) {
              errors.processTypes = "Required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="p-6 flex-auto">
              <div className="mb-4">
                <label
                  htmlFor="kg"
                  className="block text-sm font-medium text-gray-700"
                >
                  KG:
                </label>
                <Field
                  type="text"
                  id="kg"
                  name="kg"
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter KG"
                />
                <ErrorMessage
                  name="kg"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="meter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meter:
                </label>
                <Field
                  type="text"
                  id="meter"
                  name="meter"
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Meter"
                />
                <ErrorMessage
                  name="meter"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="roll"
                  className="block text-sm font-medium text-gray-700"
                >
                  Roll:
                </label>
                <Field
                  type="text"
                  id="roll"
                  name="roll"
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Roll"
                />
                <ErrorMessage
                  name="roll"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
              <label
                htmlFor="processTypes"
                className="block text-sm font-medium text-gray-700"
              >
                Select Process Types:
              </label>
              <div className="mt-1 flex">
                <label className="inline-flex items-center mr-4">
                  <Field
                    type="checkbox"
                    name="processTypes"
                    value="half"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Half Process</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <Field
                    type="checkbox"
                    name="processTypes"
                    value="full"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Full Process</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="checkbox"
                    name="processTypes"
                    value="finish"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Finish</span>
                </label>
              </div>
              <ErrorMessage
                name="processTypes"
                component="div"
                className="text-red-500"
              />
            </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  onClick={() => handleShowPreview(formikProps.values)}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {previewData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none bg-gray-800 bg-opacity-50"
          onClick={handleClosePreview}
        >
          <div className="relative bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Preview
            </h3>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Selected Quality</th>
                  <th className="px-4 py-2">Quantity (KG)</th>
                  <th className="px-4 py-2">Quantity (Meter)</th>
                  <th className="px-4 py-2">Quantity (Roll)</th>
                </tr>
              </thead>
              <tbody>
                {previewData.selectedQualities.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.quality}</td>
                    <td className="border px-4 py-2">{item.kg}</td>
                    <td className="border px-4 py-2">{item.meter}</td>
                    <td className="border px-4 py-2">{item.roll}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
