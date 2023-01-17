import React from 'react';

const UsersList = ({ usersList, deleteUsers, selectUsers }) => {
  const usersListOrder = usersList.sort((a, b) => a.first_name.localeCompare(b.first_name));
  console.log(usersList)
  return (
    <div className="users-list">
      <div className='principal-container'></div>
      <ul className={`${usersList.length==0 ? 'empty' : 'content'}`}>
        <div className='users-not-found'>
        </div>
        {usersListOrder.map(user => (
          <li className='container-elemnts-list' key={user.id}>
            <div className='container-items'>
              <div>
                <b>{user.first_name}</b>
                <b> </b>
                <b>{user.last_name}</b>
              </div>
              <div>
                <a href="#">{user.email}</a>
              </div>
              <div>
                <b>{user.birthday}</b>
              </div>
            </div>
            <div className='container-btn'>
              <i onClick={() => deleteUsers(user)} className="fa-solid fa-trash-can"></i>
              <i onClick={() => selectUsers(user)} className="fa-solid fa-pencil"></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsersList;