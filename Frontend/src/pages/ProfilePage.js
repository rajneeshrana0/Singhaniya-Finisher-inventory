import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Simulating data retrieved from user login
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890" // Example phone number
    };

    setName(userData.name);
    setEmail(userData.email);
    setPhone(userData.phone);
  }, []); // This effect runs only once after the component mounts

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    // Prevent any changes to the phone number
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform actions like submitting the form data to a server
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Profile Page
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={email}
              onChange={handleEmailChange}
              readOnly // Email is read-only as it's fetched from user login
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={phone}
              onChange={handlePhoneChange}
              readOnly // Phone is read-only as it's fetched from user login
            />
          </div>
        </div>
      
      </form>
    </div>
  );
};

export default ProfilePage;
