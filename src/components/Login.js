import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
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
    <div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={credentials.email}
            onChange={onchange}
            />
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
            type="password"
            value={credentials.password}
            onChange={onchange}
            className="form-control"
            id="password"
            name="password"
            />

        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  );
}

export default Login;
