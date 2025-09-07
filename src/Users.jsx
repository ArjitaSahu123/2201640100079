import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
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
    } catch (err) {
      console.error("Error adding user:", err);
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
