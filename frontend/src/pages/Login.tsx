import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

import { login } from "../services/auth.service";
import { setToken } from "../utils/token";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Email Validation
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    // Email Format Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password Validation
    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    // Password Length Validation
    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await login(
        email,
        password
      );

      setToken(response.data.token);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-100 flex items-center justify-center">

      <Card>

        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Mini ERP CRM
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome back! Sign in to continue.
        </p>

        <div className="space-y-4">

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            onClick={handleLogin}
            className={loading ? "opacity-70 cursor-not-allowed" : ""}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </Button>

        </div>

        <div className="mt-6 text-center">

          <p className="text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
            >
              Create Account
            </Link>

          </p>

        </div>

      </Card>

    </div>
  );
}