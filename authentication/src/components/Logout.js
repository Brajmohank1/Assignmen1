import React ,{useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
const Logout = () =>{

const navigate = useNavigate();
 
const callAboutPage = async()=>{

    try{
        const res = await fetch('/logout' , {
            method : "GET" ,

            headers : {

                Accept :  "application/json",
 
                "Content-Type" : "application/json"
            }, 
            
            credentials : "include"
        });

        // const data = await  res.json();
        console.log("logout from front")

        if(res.status === 200){
          navigate("/")
        }

        
         navigate("/")
    

        
    }
    catch(err){

        navigate("/");

    }

}
useEffect(() =>{
    callAboutPage();
     
} , [])


    return (

        <>

        <h1> Hii from logout</h1>
        </>
    )
}


export default Logout;