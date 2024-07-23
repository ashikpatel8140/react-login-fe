import React from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FieldError from "../../components/FieldError/FieldError";
import { toast } from "react-toastify";
import ApiResponse from "../../types/ApiResponse";
import useAxios from "../../hooks/useAxios";

interface SignupProps {
  // Add any additional props you might need here
}

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC<SignupProps> = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupForm>({ mode: "onBlur" });

  const submit = async (data: SignupForm) => {
    try {
      let response: ApiResponse = await axios.post("/user/signup", data);

      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/login");
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
          <form action="" onSubmit={handleSubmit(submit)}>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="Name"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is requird",
                  })}
                />
                {errors.name && <FieldError message={errors.name.message} />}
              </div>
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
                {errors.email && <FieldError message={errors.email.message} />}
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
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password is Invalid (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)",
                    },
                  })}
                />
                {errors.password && (
                  <FieldError message={errors.password.message} />
                )}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="confirm_password"
                  placeholder="Cofirm Password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm Password is required",
                    },
                    validate: (val: string) => {
                      if (watch("password") != val)
                        return "Password do not match";
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <FieldError message={errors.confirmPassword.message} />
                )}
              </div>
              <div className="col-12 mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  Sign up
                </button>
              </div>
              <div className="col-12 mb-3 text-center">
                Already have any account ?
                <Link
                  className="text-primary text-decoration-none"
                  to={"/login"}
                >
                  {" "}
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
