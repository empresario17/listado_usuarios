import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import UsersForm from "./componentes/UsersForm";
import UsersList from "./componentes/UsersList";

function App() {
  
  const [usersList, setUsersList] = useState([]);
  const [usersSelected, setUsersSelected] = useState(null);
const [butontrue, setButontrue] = useState(true)

  useEffect(() => {
    axios.get('https://users-crud.academlo.tech/users/')
    .then(res => setUsersList(res.data))
  }, [])
  const getUsersList = () => {
    axios.get('https://users-crud.academlo.tech/users/')
    .then(res => {
      setUsersList(res.data)
    })
    .catch(error => console.error(error.response?.data))
  }
  const deleteUsers = (userDelete) => {
    axios.delete(`https://users-crud.academlo.tech/users/${userDelete.id}/`)
    .then(() => {
      getUsersList()
    })
    .catch(error => console.error(error.response?.data))
  }
  const selectUsers = (user) => {
    setUsersSelected(user)
  }

  const changeTrue = ()=>{
    if (butontrue) {
      setButontrue(false)
    }else{
      setButontrue(true)
    }
  }

  return (
    <div className="App">
      {

      butontrue ?
      <div>
        <button onClick={()=>{changeTrue()}}>
          <b>Desplegar Formulario</b>
        </button>
      </div>
      :
      <UsersForm getUsersList={getUsersList} usersSelected={usersSelected} selectUsers={selectUsers} changeTrue={changeTrue}/>
    }
    
      <UsersList usersList={usersList} deleteUsers={deleteUsers} selectUsers={selectUsers}/>
    </div>
    
  );
}

export default App;
