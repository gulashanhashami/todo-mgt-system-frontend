import React from "react";

export const AddUser = ({formData, handleChange, setShowAddModal, handleAddUser})=>{

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-md">
            <h3 className="text-lg font-bold mb-4">Add New User</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border p-2 mb-2"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border p-2 mb-2"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-2 mb-2"
              value={formData.password}
              onChange={handleChange}
            />
            <select
              name="role"
              className="w-full border p-2 mb-4"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded-md"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
    )
}