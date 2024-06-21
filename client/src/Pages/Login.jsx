import React from "react";
import login_image from "/images/login_image.svg";
import { Form, NavLink, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FormLabel from "../Components/FormLabel";
import FormInput from "../Components/FormInput";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await axios.post("/api/v1/daysTracker/auth/login", data);
    toast.success("Login successful!");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={login_image}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <Form method="post">
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <FormLabel name="email" labelText="Email address" />
                          <FormInput type="email" name="email" />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <FormLabel name="password" labelText="Password" />
                          <FormInput type="password" name="password" />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg btn-block"
                            type="su"
                          >
                            Login
                          </button>
                        </div>

                        <p
                          className="mb-1 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <NavLink to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </NavLink>
                        </p>
                        <p
                          className="mb-2 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Visit our site here{" "}
                          <NavLink to="/" style={{ color: "#393f81" }}>
                            home
                          </NavLink>
                        </p>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
