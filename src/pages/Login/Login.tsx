import React from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiResponse from "../../types/ApiResponse";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import useAxios from "../../hooks/useAxios";

interface LoginProps {
  // Add any additional props you might need here
}

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onBlur" });
  const submitForm = async (data: LoginForm) => {
    try {
      let response: ApiResponse = await axios.post("/user/login", data);

      if (response.data.success) {
        let user = {
          token: response.data.data.token,
          ...response.data.data.user
        }
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(response.data.msg);
        navigate("/");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error: any) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="w-50">
          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Email is Invalid",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-danger mt-1">{errors.email.message}</div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-danger mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="col-12 mb-3 text-end">
                <Link
                  className="text-primary text-decoration-none"
                  to={"/forgot"}
                >
                  {" "}
                  Forgot Password ?
                </Link>
              </div>
              <div className="col-12 mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  Login
                </button>
              </div>
              <div className="col-12 mb-3 text-center">
                Don't have an account yet ?
                <Link
                  className="text-primary text-decoration-none"
                  to={"/signup"}
                >
                  {" "}
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
