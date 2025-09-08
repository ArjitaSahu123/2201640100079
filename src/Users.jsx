import React, { useEffect, useState } from "react";
import { Log } from "./logging/logger"; // ✅ import the reusable logger

function Users() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ Replace this with your real token from /auth API
  const token = "your-access-token-here";  

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);

      // ✅ log success
      await Log("frontend", "info", "api", "Fetched users successfully", token);
    } catch (err) {
      console.error("Error fetching users:", err);

      // ✅ log error
      await Log("frontend", "error", "api", "Failed to fetch users", token);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async () => {
    if (!newName.trim()) return;
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const user = await res.json();
      setUsers((p) => [...p, user]);
      setNewName("");

      // ✅ log success
      await Log("frontend", "info", "api", `User added: ${user.name}`, token);
    } catch (err) {
      console.error("Error adding user:", err);

      // ✅ log error
      await Log("frontend", "error", "api", "Failed to add user", token);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Users List</h2>
      {loading ? <div>Loading...</div> : null}
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter name"
        style={{ marginRight: 8 }}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default Users;
