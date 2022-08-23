import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/;

    if (email === "" || password === "") {
      Swal.fire(
        "The fields are empty",
        "Complete both fields to log in.",
        "info"
      );
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire(
        "Invalid email",
        "You must enter a valid email address to login",
        "error"
      );
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal.fire(
        "Invalid credentials",
        "Your username or password is incorrect",
        "info"
      );
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        Swal.fire("¡Successfully logged in!", "", "success");
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        setTimeout(() => {
          navigate("/list");
        }, 2000);
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/list" />}
      <div className="row justify-content-center align-items-center LoginRow mx-4" style={{ minHeight: "90vh" }}>
        <div className="col-4 LoginBox my-2">
          <h2 className="Login__title m-1">Hello!</h2>
          <p className="Login__subtitle">Login to your account</p>
          <form onSubmit={handleSubmit} className="justify-content-center" >
            <label className="form-label d-flex justify-content-center">
              <input className="form-control LoginInput" type="text" name="email" placeholder="📧​ Email" />
            </label>
            <br />
            <label className="form-label d-flex justify-content-center">
              <input className="form-control LoginInput" type="password" name="password" placeholder="​🔒​ Password"/>
            </label>
            <br />
            <div className="row justify-content-center">
            <button className="col-5 Login__btn p-2" type="submit">
              SIGN IN
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
