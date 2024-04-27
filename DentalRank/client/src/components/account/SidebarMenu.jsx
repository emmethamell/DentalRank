import React from "react";
import { ListGroup } from "react-bootstrap"

const SidebarMenu = ({ setSelectedMenu }) => (
    <ListGroup>
      <ListGroup.Item className="p-3" action onClick={() => setSelectedMenu('details')}>
        Account Details
      </ListGroup.Item>
      <ListGroup.Item className="p-3" action onClick={() => setSelectedMenu('rankings')}>
        Saved Rankings
      </ListGroup.Item>
    </ListGroup>
  );
export default SidebarMenu;  