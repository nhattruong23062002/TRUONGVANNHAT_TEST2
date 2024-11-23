import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Charts from "../../component/chart/chart";
import UserCharts from "../../component/chart/chart";
import "./page2.css"

const Page2 = () => {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [region, setRegion] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://araonsoft.com:9081/api/Test/GetSampleUserList");
        setUsers(response.data.results); 
        setFilteredUsers(response.data.results); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleFilter = () => {
    let filtered = users;
    if (gender) filtered = filtered.filter(user => user.gender == gender);
    if (ageGroup) {
      filtered = filtered.filter(user => {
        const age = user.dob.age;
        if (ageGroup === "Teen" && age >= 10 && age <= 19) return true;
        if (ageGroup === "Twenties" && age >= 20 && age <= 29) return true;
        if (ageGroup === "Thirties" && age >= 30 && age <= 39) return true;
        if (ageGroup === "MiddleAge" && age >= 40) return true;
        return false;
      });
    }
    if (region) filtered = filtered.filter(user => user.location.state.toLowerCase().includes(region.toLowerCase()));
    setFilteredUsers(filtered);
  };


  return (
    <div className="container">
      <h1>User Filter</h1>
      <div className="wrapper-filter">
        <label>Gender:</label>
        <select onChange={e => setGender(e.target.value)}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Age Group:</label>
        <select onChange={e => setAgeGroup(e.target.value)}>
          <option value="">All</option>
          <option value="Teen">10-19</option>
          <option value="Twenties">20-29</option>
          <option value="Thirties">30-39</option>
          <option value="Thirties">30-39</option>
          <option value="MiddleAge">40+</option>
        </select>
        <label>Region:</label>
        <input
          type="text"
          placeholder="Enter region"
          onChange={e => setRegion(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
 {/*      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name.first} {user.name.last}</td>
              <td>{user.gender}</td>
              <td>{user.dob.age}</td>
              <td>{user.location.state}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <UserCharts users={filteredUsers} />
    </div>
  );
};

export default Page2;
