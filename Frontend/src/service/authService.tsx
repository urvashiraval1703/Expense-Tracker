import axios from "axios"

export const signUpUser = async (formData: {
    name: string;
    email: string;
    password: string
}) => {
    console.log(formData)
    return await axios.post("http://localhost:5000/auth/register",
        formData)
}

export const verifyOtp = async (formData:any) => {
    console.log(formData)
    let obj = {
        name:formData.formData.name,
        email:formData.formData.email,
        password:formData.formData.password,
        otp:formData.otp
    }
    return await axios.post("http://localhost:5000/auth/verifyOtp",obj)
}

export const loginUser = async(formData:any)=>{
    return await axios.post("http://localhost:5000/auth/loginUser",formData)
}