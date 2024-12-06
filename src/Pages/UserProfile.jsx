import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import image from "../assets/dark-image.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { myContext } from "../contextAPI/UserContext";

function UserProfile() {
  const [picture] = useContext(myContext);
  console.log(picture);
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/employee/${id}/`);
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : "Error fetching details");
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-700 dark:text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error.error || "An error occurred"}</p>;
  }

  
  const handleEditClick = () => {
    navigate("/editprofile", { state: { userData: employee } });
  };

  return (
    <section className="container mx-auto px-8 py-10">
      <Card shadow={false} className="border border-gray-300 rounded-2xl">
        <CardHeader shadow={false} className="h-60 !rounded-lg">
          <img
            src={image}
            alt="dark"
            className="w-full h-full object-center rounded-lg"
          />
        </CardHeader>
        <CardBody>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-3 mb-6 lg:mb-0">
              <Avatar src={picture} alt="avatar" variant="rounded" />
              <div>
                <Typography color="blue-gray" variant="h6">
                  {employee.first_name}
                </Typography>
                <Typography variant="small" className="font-normal text-gray-600">
                  {employee.email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outlined"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleEditClick}
              >
                <i className="fa-brands fa-twitter" />
                Edit
              </Button>
              <Button
      variant="outlined"
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      onClick={() => {
        localStorage.removeItem("authToken"); // Example: Clear auth token
        navigate("/login"); // Navigate to login page
      }}
    >
      <i className="fa-solid fa-sign-out-alt" />
      Logout
    </Button>
            </div>
            
          </div>

          <Typography variant="small" className="font-normal text-gray-600 mt-6 lg:ml-0 ml-10">
            <div className="space-y-4">
              <div className="flex">
                <strong className="text-black-700 dark:text-black-200 w-32">First Name:</strong>
                <span className="text-gray-800">{employee.first_name}</span>
              </div>
              <div className="flex">
                <strong className="text-black-700 dark:text-black-200 w-32">Last Name:</strong>
                <span className="text-gray-800">{employee.last_name}</span>
              </div>
              <div className="flex">
                <strong className="text-black-700 dark:text-black-200 w-32">Email:</strong>
                <span className="text-gray-800">{employee.email}</span>
              </div>
              <div className="flex">
                <strong className="text-black-700 dark:text-black-200 w-32">Designation:</strong>
                <span className="text-gray-800">{employee.designation}</span>
              </div>
              <div className="flex">
                <strong className="text-black-700 dark:text-black-200 w-32">Address:</strong>
                <span className="text-gray-800">{employee.address}</span>
              </div>
            </div>
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
}

export default UserProfile;
