import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/buzzchat-logo4.png";
import BackgroundImage from '../assets/bg5.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastoptions = {
    position: "bottom-right",
    autoclose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username, password,
      });
      if (data.status == false) {
        toast.error(data.msg, toastoptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/");
      }

    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and Password is required", toastoptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and Password is required", toastoptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>BuzzChat</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} min="3" />
          <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          <button type='submit'>Login</button>
          <span>Don't have an account ? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer>

      </ToastContainer>
    </>
  );

}

const FormContainer = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center center;
height:100vh;
 width:100vw;
 display:flex;
 flex-direction:column;
 justify-content:center;
 gap: 1rem;
 align-items:center;
 background-color:#131324;
 .brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  img {
    height: 5rem;
    width: 6rem;
    border-radius: 40px;
    clip-path: circle(42% at 50% 50%); /* Apply circular clip-path to the logo */
  }

  h1 {
    color: white;
    text-transform: uppercase;
  }
}

 form{
    display:flex;
    flex-direction:column;
    gap: 2rem;
    background-color:transparent;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{


background-color: black;
opacity:0.7;

padding:1rem;
/* border:0.1rem solid #001d3d; */
border:none;
border-radius:0.4rem;

width:100%;
font-size:1.2rem;
color:white;

&:focus {
border:0.1rem solid #001d3d;
outline:none;
background-color: black;
opacity:0.9;

&::selection{
background-color: black;
opacity:0.9;
}
&::active{
background-color: black;
opacity:0.9;
}
&::visited{
background-color: black;
opacity:0.9;
}
}
}
    button{
        background-color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color:#98c1d9;
        }
    }
    span {
        color:white;
        text-transform:uppercase;
        a {
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
 }
`;

export default Login;