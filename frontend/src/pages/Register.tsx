import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form
        onSubmit={handleSubmit}
        className="auth-card"
      >
        <h1 className="auth-title">
          Register
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input-field"
            onChange={
              handleChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={
              handleChange
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={
              handleChange
            }
          />

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Register"}
          </button>

          <p className="text-center">
            Already have account?

            <Link
              to="/"
              className="text-blue-500 ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;