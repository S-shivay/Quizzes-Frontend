import { useState } from "react";
import { register } from "../services/auth";

function Register () {

    const [userData, setUserData] = useState({
        name: null,
        email: null,
        password: null,
        confirmpassword: null
    })
    const handleChange=(e)=>{

    setUserData({...userData, [e.target.name]: e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(!userData.name || !userData.email || !userData.password || !userData.confirmpassword){
            return;
        }
        try{
            const {name,email,password,confirmpassword} = userData;
            const response = await register({name,email,password,confirmpassword})
            console.log(response);
        }
        catch(error){
            console.log(error.message);
        }
    }

    return(
        <div>
            <h1>Create an Account</h1>
            <form action="" onSubmit={handleSubmit}>
                <input name="name" value={userData.name} onChange={handleChange} type="text" placeholder="Your Name" />
                <input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Your Email" />
                <input name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Your Password" />
                <input name="confirmpassword" value={userData.confirmpassword} onChange={handleChange} type="text" placeholder="Confirm Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default Register;