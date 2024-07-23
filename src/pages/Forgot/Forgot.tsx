import React, { useEffect, useState } from "react";
import "./Forgot.scss";
import { useNavigate } from "react-router-dom";
import FieldError from "../../components/FieldError/FieldError";
import { useForm } from "react-hook-form";

interface ForgotProps {
  // Add any additional props you might need here
}

type ForgotForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Forgot: React.FC<ForgotProps> = () => {
  const [isEmailFound, setIsEmailFound] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ForgotForm>({ mode: "onBlur" });



  const submit = (e: ForgotForm) => {
    if(e.email == "avi@gmail.com"){
      setIsEmailFound(true)
    }
    console.log(e);
    
  };

  return (
    <>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="w-50">
          <form action="" onSubmit={handleSubmit(submit)}>
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
                  disabled={isEmailFound}
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
              {isEmailFound && (
                <>
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
                </>
              )}

              <div className="col-12 mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  {isEmailFound ? "Reset" : "Forgot"}
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
