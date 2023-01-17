import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({ getUsersList, usersSelected, selectUsers, changeTrue }) => {
  const { handleSubmit, register, reset } = useForm();
  const [type, setType] = useState(false)
  const changeType = () => {
    setType(!type)
  }
  const emptyUsers = { email: '', password: '', first_name: '', last_name: '', birthday: '' }
  useEffect(() => {
    if (usersSelected !== null) {
      reset(usersSelected);
    } else {
      reset(emptyUsers)
    }
  }, [usersSelected]);
  const submit = (data) => {
    if (usersSelected) {
      axios
        .put(`https://users-crud.academlo.tech/users/${usersSelected.id}/`, data)
        .then(() => {
          getUsersList()
          selectUsers(null)
        });
    } else {
      axios
        .post("https://users-crud.academlo.tech/users/", data)
        .then(() => {
          getUsersList()
          reset(emptyUsers)
        });
    }
  }
  return (
    <div className='general-container'>
        <button onClick={()=>{changeTrue()}}>
          <b> Ocultar Formulario</b>
        </button>
      <h1>New User</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="input-container-name">
          <i className="fa-solid fa-user"></i>
          <input placeholder='First Name' type="text" id="first_name" {...register("first_name")} required />
          <input placeholder='Last Name' className='last_name' type="text" id='last_name' {...register("last_name")} required />
        </div>
        <div className="input-container">
          <i className="fa-solid fa-envelope"></i>
          <input placeholder='email' type="text" id='email' {...register("email")} required />
        </div>
        <div className="input-container">
          <i className="fa-solid fa-lock"></i>
          <input placeholder='Password' type={`${type ? "text" : "password"}`} id='password' {...register("password")} required />
          <i onClick={changeType} className={`${type ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}`}></i>
        </div>
        <div className="input-container">
          <i className="fa-solid fa-cake-candles"></i>
          <input type="date" id='birthday' {...register("birthday")} required />
        </div>
        <div className='btn-form'>
          <button>Upload</button>
        </div>
      </form>
    </div>
  );
};
export default UsersForm;