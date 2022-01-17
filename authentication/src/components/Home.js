import React , {useState , useEffect } from "react";


import {useNavigate} from 'react-router-dom'
import backImg from '../images/backImg.jpg'
import frontImg from '../images/frontImg.jpg'
import '../App.css'

const Home = () =>{

 const navigate = useNavigate()


 const callAboutPage = async()=>{

  try{
      const res = await fetch('/about' , {
          method : "GET" ,

          headers : {

              Accept :  "application/json",

              "Content-Type" : "application/json"
          }, 
          
          credentials : "include"
      });

      

      if(res.status === 200){
        navigate("/dashboard")
      }else{
         

      }

      
       
      
      
  }
  catch(err){

      navigate("/");

  }

}
useEffect(() =>{
  callAboutPage();
   
} , [])







  const [emp , setEmp] = useState({
    ecode : "" , password : "" , userType : ""
  })
  let name1 , value1 ;
  const handleUserInput = (e) =>{

    name1 = e.target.name;
    value1 = e.target.value;
    setEmp({ ...emp , [name1] : value1})
  }

  const logData =  async (e) =>{

    e.preventDefault();

    const {ecode, password , userType} = emp;

         const res1   =  await fetch("/login" , {
           method : "POST",
  
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
       ecode , password , userType
    })
  })

  
   if(res1.status === 201){
     window.alert("Login Successful !!!")
     navigate("/dashboard")
   }
   else if(res1.status === 202)
    window.alert("Wrong Password")
    else if(res1.status === 203)
      window.alert("please select User Type  !!!")
    else if(res1.status === 204)
      window.alert(`${emp.ecode} doesn't found`)
  }

  const [user , setUser] = useState({
    name : "" , surname : "" , ecode : "", password : "" , userType : ""
  });
  let name , value;
  const handleInput = (e) =>{

    name = e.target.name;
    value = e.target.value;

    setUser({...user , [name] : value})

  }
  const postData =  async (e) =>{

    e.preventDefault();

    const {name , surname , ecode , password , userType} = user;

         const res   =  await fetch("/register" , {method : "POST",
  
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      name , surname , ecode , password , userType
    })
  })

  if(res.status === 420){
    window.alert("Please Field All the data !!!")
     
  }
  else if(res.status === 421)
   window.alert("User Already Exists !!!")
   else if(res.status === 201)
   {  window.alert("Registration Successfull   !!!")
      navigate("/dashboard")


}
   else if(res.status === 5000)
     window.alert("Registration Failed  !!!")
 


  }





return(
<>
<body>
<div class="container">
    <input type="checkbox" id="flip" />
    <div class="cover">
      <div class="front">
        <img src={frontImg} alt="frontImg" />
        <div class="text">
          <span class="text-1">Every new friend is a <br /> new adventure</span>
          <span class="text-2">Let's get connected</span>
        </div>
      </div>
      <div class="back">
        <img class="backImg" src={backImg} alt="backImg" />
        <div class="text">
          <span class="text-1">Complete miles of journey <br /> with one step</span>
          <span class="text-2">Let's get started</span>
        </div>
      </div>
    </div>
    <div class="forms">
        <div class="form-content">
          <div class="login-form">
            <div class="title">Login</div>
          <form method = "POST">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input type="number" name="ecode" value={emp.ecode} onChange={handleUserInput} placeholder="Enter your 4 digit Ecode" required />
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input type="password" name="password" value={emp.password} onChange={handleUserInput} placeholder="Enter your password" required />
              </div>
              
              <div class="input-box">
                      
                      <label class="input-group-text" for="inputGroupSelect02">User Type</label>
                       <select class="form-select" id="inputGroupSelect02" name="userType" value={emp.userType} onChange= {handleUserInput}>
                          <option value="1" selected >Select User Type  </option>
                          <option value="ADMIN">ADMIN</option>
                         <option value="EMPLOYEE">EMPLOYEE</option>
                          
                          </select>        
                      </div>
              <div class="button input-box">
                <input type="submit" value="Submit" onClick ={logData}/>
              </div>
              <div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
            </div>
        </form>
      </div>
        <div class="signup-form">
          <div class="title">Signup</div>
        <form method="POST">
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input type="text" name="name" value={user.name} onChange={handleInput} placeholder="Enter your name" required />
              </div>
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input type="text" name= "surname" value={user.surname} onChange={handleInput} placeholder="Enter your SurName" required />
              </div>
              <div class="input-box">
                <i class="fas fa-user"></i>
                <input type="number" name="ecode" value={user.ecode} onChange={handleInput} placeholder="Enter 4 digit Ecode" required />
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input type="password" name = "password" value={user.password} onChange={handleInput} placeholder="Enter your password" required />
              </div>
              <div class="input-box">
                      
              <label class="input-group-text" for="inputGroupSelect01">User Type</label>
               <select class="form-select" id="inputGroupSelect01" name="userType" value={user.userType} onChange= {handleInput}>
                  <option selected value="1" >Select userType</option>
                  <option value="ADMIN">ADMIN</option>
                 <option value="EMPLOYEE">EMPLOYEE</option>
                  
                  </select>        
              </div>
              <div class="button input-box">
                <input type="submit" value="Sumbit" onClick={postData}/>
              </div>
              <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
            </div>
      </form>
    </div>
    </div>
    </div>
  </div>



  </body>

</>

)
}


export default Home;