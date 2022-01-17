import React, { useEffect , useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavLink } from "react-router-dom";

import {useNavigate} from 'react-router-dom'

import '../About.css'
const About = () =>{
 
const [userData , setUserData] = useState({});
     
  const navigate = useNavigate();
 
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

        const data = await  res.json();

        if(!res.status === 200){
          navigate("/")
        }

        console.log(data)
         
        setUserData(data)

        
    }
    catch(err){

        navigate("/");

    }

}
useEffect(() =>{
    callAboutPage();
     
} , [])

    

    

return(
<>

 

 		
        <div class="ScriptTop">
            <div class="rt-container">
                <div class="col-rt-4" id="float-right">
         
                    
                    
                </div>
                <div class="col-rt-2">
                    <ul>
                        {/* <li><a href="https://codeconvey.com/html-code-for-student-profile" title="Back to tutorial page">Back to Tutorial</a></li> */}
                    </ul>
                </div>
            </div>
        </div>
        
        <header class="ScriptHeader">
            <div class="rt-container">
                <div class="col-rt-12">
                    <div class="rt-heading">
                        <h1>User  Profile Page </h1>
                         
                    </div>
                </div>
            </div>
        </header>
        
        <section>
            <div class="rt-container">
                  <div class="col-rt-12">
                      <div class="Scriptcontent">
                      
        
        <div class="student-profile py-4">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="card shadow-sm">
                  <div class="card-header bg-transparent text-center">
   
                    <h3>{userData.name} </h3>
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                  </div>
                  <div class="card-body">
                    <p class="mb-0"><strong class="pr-1">Ecode  ID:</strong>{userData.ecode}</p>
                    <p class="mb-0"><strong class="pr-1">User Type:</strong>{userData.userType}</p>
                     
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="card shadow-sm">
                  <div class="card-header bg-transparent border-0">
                    <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
                  </div>
                  <div class="card-body pt-0">
                    <table class="table table-bordered">
        

                      <tr>
                        <th width="30%">User Type</th>
                        <td width="2%">:</td>
                        <td>{userData.userType}</td>
                      </tr>
        
        
                      <tr>
                        <th width="30%">Name</th>
                        <td width="2%">:</td>
                        <td>{userData.name}</td>
                      </tr>
                      <tr>
                        <th width="30%">Surname	</th>
                        <td width="2%">:</td>
                        <td>{userData.surname}</td>
                      </tr>
        
                      <tr>
                        <th width="30%">Ecode	</th>
                        <td width="2%">:</td>
                        <td>{userData.ecode}</td>
                      </tr>
                      
                       
                    </table>
                  </div>
                </div>
                  <div style={{height: "26px"}}></div>
                <div class="card shadow-sm">
                  <div class="card-header bg-transparent border-0">
                    <h3 class="mb-0"><i class="far fa-clone pr-1"></i>Other Information</h3>
                  </div>
                  <div class="card-body pt-0">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         
                   
                    </div>
                </div>
</div>
        </section>
             
        
         
        
 
 






</>

)
}


export default About;