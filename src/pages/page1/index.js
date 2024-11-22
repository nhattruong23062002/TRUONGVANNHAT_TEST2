import React, { useState, useEffect } from 'react';
import './page1.css';
import axios from 'axios';

const Page1 = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0; 
    let valueA, valueB;
  
    if (sortConfig.key === 'company') {
      valueA = a.company.name.toLowerCase();
      valueB = b.company.name.toLowerCase();
    } else if (sortConfig.key === 'address') {
      valueA = a.address.city.toLowerCase();
      valueB = b.address.city.toLowerCase();
    } else {
      valueA = a[sortConfig.key]?.toLowerCase();
      valueB = b[sortConfig.key]?.toLowerCase();
    }
  
    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user); 
  };

  const handleClosePopup = () => {
    setSelectedUser(null); 
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  return (
    <div className='container'>
      <div className='wrapper-header'>
        <h1>User List</h1>
        <input
          type="text"
          placeholder="Search Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input_search'
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name</th>
            <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>Email</th>
            <th onClick={() => handleSort('address')} style={{ cursor: 'pointer' }}>Address</th>
            <th onClick={() => handleSort('company')} style={{ cursor: 'pointer' }}>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr 
              key={user.id} 
              onClick={() => handleUserClick(user)} 
              style={{ cursor: 'pointer' }}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{`${user.address.city}, ${user.address.street}`}</td>
              <td>{user.company.name}</td>
            </tr> 
          ))} 
        </tbody> 
      </table>

      {selectedUser && (
        <div className="popup">
          <div className="popup-content">
            <h2><strong>{selectedUser.name}</strong></h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Address:</strong> {selectedUser.address.city}</p>
            <p><strong>Company:</strong> {selectedUser.company.name}</p>
            <button onClick={handleClosePopup} style={{ marginTop: '10px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  ); 
}; 
 
export default Page1;
