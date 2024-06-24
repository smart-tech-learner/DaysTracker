import { Form, Link, NavLink, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import FormLabel from "../Components/FormLabel";
import FormInput from "../Components/FormInput";
import FormSelect from "../Components/FormSelect";
import { GENDERS } from "../Utils/Constants";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/daysTracker/auth/register", data);
    toast.success("Registration successful!");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="">
        <div
          className="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best <br />
                  <span className="text-primary">simple day counter</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Quit smoking, drinking and other bad habits. Keep track of
                  happy moments in your life. Remember your errands. Form good
                  habits by seeing the...
                  <br></br>
                  LAST TIME YOU DID IT.
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <Form method="post">
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <FormLabel
                              name="firstName"
                              labelText="First Name"
                            />
                            <FormInput type="text" name="firstName" />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <FormLabel name="lastName" labelText="Last Name" />
                            <FormInput type="text" name="lastName" />
                          </div>
                        </div>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <FormLabel name="email" labelText="Email address" />
                        <FormInput type="email" name="email" />
                      </div>
                      <div className="mb-3">
                        <FormLabel name="gender" labelText="Gender" />
                        <FormSelect
                          name="gender"
                          list={Object.values(GENDERS)}
                        />
                      </div>
                      <div className="mb-3">
                        <FormLabel name="dob" labelText="Date of Birth" />
                        <FormInput type="date" name="dob" />
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <FormLabel name="password" labelText="Password" />
                        <FormInput type="password" name="password" />
                      </div>

                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-block mb-4"
                      >
                        {isSubmitting ? "Signing up..." : "Sign up"}
                      </button>
                      <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have an account?{" "}
                        <NavLink to="/login" style={{ color: "#393f81" }}>
                          Login here
                        </NavLink>
                      </p>
                      <p className="mb-2 pb-lg-2" style={{ color: "#393f81" }}>
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
      </section>
    </div>
  );
};

export default Register;
