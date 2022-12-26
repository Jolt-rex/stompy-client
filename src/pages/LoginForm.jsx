import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Joi from 'joi';
import auth from '../services/authService';
import './styles.css';

const LoginForm = ({ user, onLogin }) => {
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
    <div className="container">
      <div className="row spacer"></div>
      <div className="row">
        <div className="col-xs-1 col-sm-2 col-md-3 col-xl-4"></div>
        <div className="col-xs-10 col-sm-8 col-md-6 col-xl-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group pb-3">
              <label >Not a member? <a href="register">Register now</a></label>
            </div>
            <div className="form-group pb-3">
              <label className="">Email address</label>
              <input type="email" className={"form-control" + (errors.email ? " warning" : "")} placeholder="Enter email" name="email" value={email} onChange={handleChangeEmail} />
              {errors.email ? <small className="form-text text-danger" >{errors.email}</small> :
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className={"form-control" + (errors.password ? " warning" : "")} placeholder="Password" name="password" value={password} onChange={handleChangePassword} />
              {errors.password && <small className="form-text text-danger" >{errors.password}</small> }
            </div>
            <div className="form-group pt-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default LoginForm;