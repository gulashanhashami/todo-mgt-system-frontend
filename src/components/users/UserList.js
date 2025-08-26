import React, { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { EditUser } from "../elements/modalUi/EditUser";
import { AddUser } from "../elements/modalUi/AddUser";

// code for user list 
export const UserList =()=> {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editUserId, setEditUserId] = useState(null);
  const { user } = useAuth();

  // function for fetching user data
  useEffect(() => {
    userList();
  }, [user.token]);

  const userList =()=>{
    axios
      .get("http://localhost:9000/users/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function for adding user
  const handleAddUser = () => {
    axios
      .post("http://localhost:9000/users/create", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setUsers([...users, res.data]);
        setShowAddModal(false);
        userList();
        setFormData({ name: "", email: "", password: "", role: "user" });
      })
      .catch((err) => alert(err.response?.data?.message));
  };

  // code for editing modal with user data
  const handleOpenEdit = (user) => {
    setEditUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // can leave blank, only update if needed
      role: user.role,
    });
    setShowEditModal(true);
  };

  // function for updating user data
  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:9000/users/update/${editUserId}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setUsers(users.map((u) => (u._id === editUserId ? res.data : u)));
        setShowEditModal(false);
        setFormData({ name: "", email: "", password: "", role: "user" });
      })
      .catch((err) => alert(err.response?.data?.message));
  };

  // function for delete user data
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9000/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setUsers(users.filter((u) => u._id !== id));
      })
      .catch((err) => alert(err.response?.data?.message));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employee Management</h2>
        {(user?.user.role === "admin" || user?.user.role === "manager") && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowAddModal(true)}
          >
            + Add New User
          </button>
        )}
      </div>

      {/* User Table for showing data */}
      <table className="w-full border-collapse border rounded-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b text-start">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span
                  className={`px-4 py-1 rounded-xl ${
                    u.role === "admin"
                      ? "bg-green-100 text-green-800"
                      : u.role === "manager"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td className="p-2 flex gap-2">
                {(user?.user.role === "admin" || user?.user.role === "manager") && (
                  <IconButton
                  aria-label="edit" 
                  color="primary" 
                    onClick={() => handleOpenEdit(u)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {user?.user.role === "admin" && (
                  <IconButton
                  aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(u._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      {showAddModal && (
        <AddUser 
        formData={formData}
       handleChange={handleChange}
        setShowAddModal={setShowAddModal}
        handleAddUser={handleAddUser}
        />
      )}

      {/* Edit User Modal */}
      {showEditModal && (
       <EditUser 
       formData={formData}
       setFormData={setFormData}
       handleChange={handleChange}
       setShowEditModal={setShowEditModal}
       handleUpdateUser={handleUpdateUser}
       />
      )}
    </div>
  );
}