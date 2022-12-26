import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Joi from 'joi';
import auth from '../services/authService';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
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
    <>
      <div className="pt-4 pb-4"></div>
      <div className="container pt-4 pb-4" style={{"width":"40%"}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group pb-3">
            <label >Not a member? <a href="register">Register now</a></label>
          </div>
          <div className="form-group pb-3">
            <label>Email address</label>
            <input type="email" className={"form-control" + (errors.email ? "warning" : "" )} id="inputEmail" placeholder="Enter email" name="email" value={email} onChange={handleChangeEmail} /> 
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className={"form-control" + (errors.password ? "warning" : "")} id="exampleInputPassword1" placeholder="Password" name="password" value={password} onChange={handleChangePassword} />
          </div>
          <div className="form-group pt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
 
export default LoginForm;