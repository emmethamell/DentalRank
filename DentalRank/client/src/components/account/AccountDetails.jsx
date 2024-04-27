import React from "react";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { Stack } from "react-bootstrap";

const AccountDetails = ({ user }) => (
  <Stack gap={3}>
    <div className="p-2">
      <FaEnvelope /> {user.email}
    </div>
    <div className="p-2">
      <FaUserCircle /> {user.name}
    </div>
  </Stack>
);

export default AccountDetails;
