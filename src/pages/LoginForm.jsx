import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Joi from 'joi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import auth from '../services/authService';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordView, setPasswordView] = useState("password");
  const [schema] = useState({
      email: Joi.string().min(5).max(255).required().email({ tlds: { allow: false } }).label('Email'),
      password: Joi.string().min(5).max(255).required().label('Password')
  });
  
  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const joiSchema = Joi.object({ [name]: schema[name]});
    const { error } = joiSchema.validate(obj);

    return error ? error.details[0].message : null;
  }
  
  function validate() {
    const joiSchema = Joi.object(schema);
    const { error } = joiSchema.validate({ email, password }, { abortEarly: false });
    if (!error) return null;

    const err = {}
    for (let item of error.details)
      err[item.path[0]] = item.message;
    
    return Object.keys(err).length === 0 ? null : err;
  }

  function handleChangeEmail({ currentTarget: input }) {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    setEmail(input.value);
    setErrors(err);
  }
  
  function handleChangePassword({ currentTarget: input }) {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    setPassword(input.value);
    setErrors(err);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  function handleChangeEye() {
    if (passwordView === "password")
      setPasswordView("text");
    else
      setPasswordView("password");
  }

  async function doSubmit() {
    try {
      await auth.login({ email, password });
      onLogin();
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const err = { ...errors };
        err.email = ex.response.data;
        setErrors(err);
      }        
    }
  }

  if(auth.getCurrentUser()) return <Navigate replace to='/' />

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className="register">
              <p>Not a member? <a href="register">Register Now</a></p>
          </div>
        </div>
        <div className="input-group mb-3">
          <label for="inputEmail">Email address</label>
          <input className={"form-control" + ` ${errors.email ? "warning" : "" }`} type="email" placeholder="Enter Email" name="email" value={email} onChange={handleChangeEmail} />
          <p className={` ${errors.email ? "danger" : "" }`}>Please enter a valid email address.</p>
        </div>
        <div className="input-group mb-3">
          
          <label for="inputPassword">Password</label>
          <input className={"form-control" + ` ${errors.password ? "warning" : ""}`} type={passwordView} placeholder="Enter Password" name="password" value={password} onChange={handleChangePassword} />
          <div className="input-group-append">
            <div className="input-group-text" id="basic-addon2">
              {passwordView === "text" ? <VisibilityIcon onClick={handleChangeEye} /> : <VisibilityOffIcon onClick={handleChangeEye} />}    
          
            </div>
          </div>
        </div>
            <div className="recovery">
              <p>Recover Password</p>
            </div>
          <div className="btn">
            <button type="submit">Sign in</button>
          </div>
      </form>
    </div>
  );
}
 
export default LoginForm;