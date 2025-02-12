'use client'
import { useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
  }
const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      allUsers(token);
    }
  }, []);

  const allUsers = async (authToken: string) => {
    console.log("Auth Token:", authToken);
  
    try {
      const response = await fetch("http://localhost:7000/api/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Users:", data);
  
        if (data.length === 0) {
          console.warn("No users found.");
        }
  
        setUsers(data);
      } else {
        console.error("Failed to fetch users:", response.status, await response.text());
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  

  const addUser = async () => {
    const response = await fetch("http://localhost:7000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      alert("User added successfully");
      if (token) allUsers(token);
      console.log(token);
    }
  };


    return (
        <div>
            <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add User
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="border p-2 mb-2 rounded text-white">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div> 
        </div>
    );
};

export default Users;