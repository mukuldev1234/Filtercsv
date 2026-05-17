import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
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

      // 🔥 LOGIN API
      const res = await api.post(
        "/auth/login",
        formData
      );

      console.log(
        "LOGIN RESPONSE:",
        res.data
      );

      // 🔥 CHECK TOKEN
      if (!res.data.token) {
        toast.error(
          "No token received"
        );

        return;
      }

      // 🔥 SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem(
          "token"
        )
      );

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");
    } catch (error: any) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data ||
          error
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
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
          Login
        </h1>

        <div className="space-y-4">
          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={
              handleChange
            }
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          {/* REGISTER */}

          <p className="text-center">
            No account?

            <Link
              to="/register"
              className="text-blue-500 ml-2"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;