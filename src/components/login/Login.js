import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Label } from "../elements/Label";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from 'lucide-react';

export const Login =()=>{
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // 👈 Loading state
    const { login, user } = useAuth();
    const navigate = useNavigate();
  
    const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      if (!form.email || !form.password) {
        return setError('Email and password are required');
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        return setError('Invalid email format');
      }
  
      try {
        setLoading(true);
        const loggedInUser = await login(form);
  
        if (loggedInUser?.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } catch (err) {
        setError(err.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-20">
        <form onSubmit={handleSubmit} className="space-y-5 pr-6 pl-6 pt-10 pb-20 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Welcome Back</h2>
          <p className="text-sl mb-10">Sign in to your account to continue</p>
  
  <div>
  <Label className="text-sm text-gray-700">Email</Label>
  <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
  </div>
         <div>
         <Label className="text-sm text-gray-700">Password</Label>
         <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
            </div> 
  
          {error && <p className="text-red-600 text-sm">{error}</p>}
  
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
  
          <p className="text-center text-sm text-gray-600 mt-2">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    );
  }