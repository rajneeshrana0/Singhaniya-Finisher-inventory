import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SideMenu() {
  const [userRole, setUserRole] = useState(null);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch user role after component mounts
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      // Fetch user role using stored JWT token
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4000/api/login", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserRole(response.data.check);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Define menu items based on user role
  const menuItems = {
    Account: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/account-stock-in", label: "Account Stock IN", icon: require("../assets//aso.jpeg") },
      { to: "/job-card", label: " Account Stock Table", icon: require("../assets//aso.jpeg") },
      { to: "/account-stock-out", label: "Account Stock Out", icon: require("../assets//aso.jpeg") },
      { to: "/stock-out-data", label: "Account Stock Out Table", icon: require("../assets//aso.jpeg") },

    ],
    Dispatch: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/dispatch-stock", label: " Dispatch Stock In", icon: require("../assets//aso.jpeg") },
      { to: "/dispatch-data", label: " Dispatch Stock Table", icon: require("../assets//aso.jpeg") },
      
    ],
    Heat: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/heat-issue", label: "Heatset Issue", icon: require("../assets//aso.jpeg") },
      { to: "/heat-issue-table", label: "Heatset Issue Table", icon: require("../assets//aso.jpeg") },
     
    ],
    Process: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/processing-issue", label: " Processing Issue", icon: require("../assets//aso.jpeg") },
      { to: "/process-issue-table", label: " Processing Issue Table", icon: require("../assets//aso.jpeg") },
     
    ],
    Finish: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/finish-issue", label: "Finish Issue", icon: require("../assets//aso.jpeg") },
      { to: "/admin/settings", label: "Finish Issue Table", icon: require("../assets//aso.jpeg") },
    
    ],
    Grey: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/grey-stock", label: "Grey Stock IN ", icon: require("../assets//aso.jpeg") },
      { to: "/grey-table", label: " Grey Table", icon: require("../assets//aso.jpeg") },
   
    ],
    
    Admin: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/acc-stock-in-data", label: "Account Stock IN", icon: require("../assets//aso.jpeg") },
      { to: "/grey-data", label: "Grey Data", icon: require("../assets//aso.jpeg") },
      { to: "/heat-data", label: "Heat Data", icon: require("../assets//aso.jpeg") },
      { to: "/finish-data", label: " Finish Data", icon: require("../assets//aso.jpeg") },
      { to: "/dispatch-datat", label: "Dispatch Data ", icon: require("../assets//aso.jpeg") },
      { to: "/acc-stock-out-data", label: "Account Stock Out Table", icon: require("../assets//aso.jpeg") },

    ],

    // Define menu items for other roles as needed
  };

  // Handle case where userRole is not found in menuItems
  const userMenuItems = menuItems[userRole] || [];

  return (
    <div className="h-screen  flex-col justify-between bg-white hidden lg:flex shadow-2xl">
    
      <div className="px-4 py-6 mt-8">
        <nav aria-label="Main Nav" className="mt-4 flex flex-col space-y-1">
          {userMenuItems.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.to}
              className="flex items-center gap-2 rounded-lg hover:bg-blue-400  px-4 py-2 hover:text-white-700"
            >
              <img alt={menuItem.label} src={menuItem.icon}
              className="flex items-center gap-2" />
              <span className="text-sm font-bold  ">{menuItem.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Profile section */}

      <div className=" fixed inset-x-0 bottom-0 border-t border-gray-100">
        <Link to="/profile-page">
          <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt="Profile"
              src={localStorageData.imageUrl}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {localStorageData.firstName + " " + localStorageData.lastName}
                </strong>

                <span> {localStorageData.email} </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
