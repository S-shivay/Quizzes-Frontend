import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

export const register = async({name,email,password,confirmpassword}) =>{
    try{
        const response = await axios.post(`${BACKEND_URL}/auth/register`,{
            name,
            email,
            password,
            confirmpassword
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
        return response;
    }
    catch(error){
        return new Error (error.response.data.message);
    }
}