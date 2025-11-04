import React, { useState } from "react";
import { userAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { Link } from "react-router";
import {
  LoaderIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
} from "lucide-react";

const LoginPage = () => {
  const { isLoggedIn, login } = userAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-900 p-5">
      <div className="relative w-full m-w-6xl h-[550px] md:h-[600px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* Left Column  */}

            <div className="md:w-1/2 flex flex-col jusify-center items-center md:border-r border-slate-600/30">
              <div className="w-full flex flex-col justify-center items-center my-auto">
                <div className="space-y-3 text-center mb-6">
                  <MessageCircleIcon className="h-12 w-12 text-slate-400 mx-auto" />
                  <h1 className="font-bold text-slate-200 text-2xl">
                    Login Account
                  </h1>
                  <p className="text-slate-400">Enter your correct details</p>
                </div>

                {/* FORM  */}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center items-center space-y-6"
                >
                  {/* EMAIL  */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        className="input"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* Password  */}

                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        className="input"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggedIn}
                  >
                    {isLoggedIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login"
                    )}
                  </button>

                  <div className="my-4 text-center">
                    <Link to={"/signup"} className="auth-link">
                      No account yet? Signup
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;
