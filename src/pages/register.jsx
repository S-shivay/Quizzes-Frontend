import { useState } from "react";
import { register, login } from "../services/auth";
import './register.css';
import { useNavigate } from "react-router-dom";
function Register() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (value) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateSignUp = () => {
    const { name, email, password, confirmpassword } = userData;
    const newErrors = {};

    if (!name) newErrors.name = "Invalid name";
    if (!email) newErrors.email = "Invalid email";
    if (password.length < 6) newErrors.password = "Weak password";
    if (password !== confirmpassword)
      newErrors.confirmpassword = "Password doesn't match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    try {
      const { name, email, password, confirmpassword } = userData;
      const response = await register({ name, email, password, confirmpassword });
      if (response.status === 200) {
        alert("Registration Successful");
        setIsLogin(true); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) return;

    try {
      const { email, password } = userData;
      const response = await login({ email, password });
      if (response.status === 200) {
        // const { data } = response;
        // localStorage.setItem('token', data.token);
        alert("User Logged In Successfully");
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>QUIZZIE</h1>
      <div className="form-toggle">
        <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>
          Sign Up
        </button>
        <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>
          Log In
        </button>
      </div>
      {!isLogin ? (
        <form onSubmit={handleSignUp}>
          <input name="name" value={userData.name} onChange={handleChange} type="text" placeholder="Your Name"/>
          {errors.name && <span className="error">{errors.name}</span>}
          <input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Your Email" />
          {errors.email && <span className="error">{errors.email}</span>}
          <input name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Your Password" />
          {errors.password && <span className="error">{errors.password}</span>}
          <input name="confirmpassword" value={userData.confirmpassword}onChange={handleChange} type="password" placeholder="Confirm Password"/>
          {errors.confirmpassword && (
            <span className="error">{errors.confirmpassword}</span>
          )}
          <button
            type="submit"
            disabled={ !userData.name || !userData.email || !userData.password || userData.password !== userData.confirmpassword } >
            Sign-Up
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Your Email" />
          <input name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Your Password" />
          <button type="submit" disabled={!userData.email || !userData.password} >
            Log In
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
