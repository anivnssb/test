import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashBoard = () => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState("");

  const navigate = useNavigate();
  const fetchAllusers = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/user-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.json();
      setAllUsers(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const userdetails = JSON.parse(localStorage.getItem("userInfo"));
    if (!userdetails || !userdetails?.token) {
      console.log(userdetails);
      navigate("/login");
    }
    setUser(userdetails.user);
    fetchAllusers(userdetails.token);
  }, []);
  return (
    <>
      <Navbar {...{ name: user.name, type: user.type }} />
      <div>
        {allUsers ? (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>user Type</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(({ name, type }) => (
                <tr>
                  <td>{name}</td>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DashBoard;
