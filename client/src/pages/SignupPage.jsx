import React, { useState } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { userAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router";

const SignupPage = () => {
  const { isSigningUP, signup } = userAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  return (
    <div className="w-full bg-slate-900 flex items-center justify-center p-5">
      <div className=" relative w-full max-w-6xl md:h-[600px] h-[550px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row ">
            {/* Left column  */}
            <div className="md:w-1/2 flex flex-col items-center justify-center md:border-r border-slate-600/30">
              {/* Heading  */}
              <div className="w-full">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h1 className="font-bold text-2xl text-slate-200">
                    Create Account
                  </h1>
                  <p className="text-slate-4 mb-2">Sign up for a new account</p>
                </div>
              </div>

              {/* Form  */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name  */}
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      className="input"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email  */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />
                    <input
                      className="input"
                      type="email"
                      placeholder="johndoe@gmail.com"
                      value={formData.email}
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
                      className="input"
                      type="password"
                      value={formData.password}
                      placeholder="******"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Submit Btn  */}
                <button
                  className="auth-btn"
                  type="submit"
                  disabled={isSigningUP}
                >
                  {isSigningUP ? (
                    <LoaderIcon className="animate-spin w-full h-5 text-center" />
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="my-4 text-center">
                  <Link
                    to="/login"
                    className="auth-link flex justify-center items-center"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default SignupPage;
