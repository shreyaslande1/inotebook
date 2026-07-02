import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [credentials, setcredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handlesubmit = async (e)=>{
        e.preventDefault()
        const login = await fetch("https://inotebookbyshreyas.onrender.com/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        })
        
        const json = await login.json();
    console.log("LOGIN RESPONSE:", json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showalert("logged in successfully", "success");
            navigate('/');
        } else {
            props.showalert("invalid credentials", "danger");
        }
    }
    const onchange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='mt-3'>
        <h2>Login to continue to iNotebook</h2>
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
