import React from "react";


const AccountDetails = ({user}) => (
    <div>
      <h4>MAIL: {user.email}</h4>
      <h4>Name: {user.name}</h4>
    </div>
  );

export default AccountDetails