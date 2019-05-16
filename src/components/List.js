import React from 'react';

const List = ({ users }) => (
  <ul>
    {users.map(user => {
      return (
        <li key={user.uuid}>
          <h2>{user.fullName}</h2>
          <span>{user.dob.age}</span>
          <span>{user.gender}</span>
        </li>
      );
    })}
  </ul>
);

export default List;
