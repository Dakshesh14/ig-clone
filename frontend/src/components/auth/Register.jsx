import React, { memo } from "react";

import { Link, useHistory } from "react-router-dom";

// importing actions
import { csrftoken } from "../../common/getCsrfToken";

// importing axios
import axios from "axios";

// importing redux related stuff
import { connect } from "react-redux";
import { userRegisterSuccess, userLogout } from "../../store/user/action";

// importing formik and yup for form validation
import * as Yup from "yup";
import { FormikProvider, useFormik, Form } from "formik";

// importing components
import TextField from "../../common/TextField";

function Register({ userRegisterSuccess, userLogout }) {
  let history = useHistory();

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (value) => {
    axios({
      method: "POST",
      url: "../auth/api/register",
      data: value,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((res) => {
        const data = {
          ...res.data.user,
          token: res.data.token,
        };
        userRegisterSuccess(data);
        history.push("/");
      })
      .catch((err) => {
        const error = err.response.data;
        for (const index in error) {
          formik.setFieldError(index, error[index][0]);
        }
        userLogout();
      });
  };

  // setting up formik
  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <h2 className="fs-1 mb-5">Register</h2>
          <FormikProvider value={formik}>
            <Form>
              <TextField label="Username" name="username" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Password" name="password" type="password" />
              <small className="form-text text-muted">
                <ul className="list-unstyled">
                  <li>Your password must contain at least 8 characters.</li>
                  <li>
                    {" "}
                    One Uppercase, One Lowercase, One Number and one special
                    case Character
                  </li>
                </ul>
              </small>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <p className="text-muted">
                Already have an account?
                <Link to="/login" className="ms-1">
                  Login
                </Link>
              </p>
              <button className="btn btn-dark mt-3 float-end" type="submit">
                Register
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  userRegisterSuccess: (payload) => userRegisterSuccess(payload),
  userLogout: () => userLogout(),
};

export default connect(null, mapDispatchToProps)(memo(Register));
