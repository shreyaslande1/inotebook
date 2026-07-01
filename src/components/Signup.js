import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [credentials, setcredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handlesubmit = async (e)=>{
        e.preventDefault()
        const login = await fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE0MjEyZjY5NjgwZmMzNDIzODQwMmJkIn0sImlhdCI6MTc4MjcxNTEyNn0.lWwWver03m4ckJAniN2FkHnZiJUtH_9I-X6Aj5rIMGc"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const json = await login.json()
        console.log(json)
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken)
            navigate.push('/')
        }else{
            alert("invalid credentials")
        }
    }
    const onchange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
      <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name"  onChange={onchange}aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onchange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onchange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="cpassword" className="form-control" id="cpassword" onChange={onchange}/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default Signup;
