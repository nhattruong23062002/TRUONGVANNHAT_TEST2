import React, { useState, useEffect } from "react";
import axios from "axios";
import HereMap from "../../component/hereMap/hereMap";

const Page3 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://araonsoft.com:9081/api/Test/GetSampleUserList");
        setUsers(response.data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log('user',users)
  return (
    <div>
      <h1>Here Maps Example</h1>
      {users.length > 0 ? (
        <HereMap users={users} />
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default Page3;
