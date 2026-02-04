// import { createContext } from "react";
import React, {createContext,useState,useEffect} from "react";

//create context
export const UserContext = createContext<any>(null);

//Provider
export const UserProvider = ({children}:{children:React.ReactNode})=>{
    const [user,setUser] = useState<any>(null);

    useEffect(()=>{
        const savedUser = localStorage.getItem("User")
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
    },[])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
