import './Vendor.css'; 

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { NavLink } from "react-router-dom";

function Vendor() {
  const [show, setShow] = useState(false);
  const [vendors, setVendors] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="Vendor">
      <Container className="p-3">
        My Subscriptions
        {vendors.length ? vendors.map((item)=><div key={item.vendor} className="vendor-item">
            <span className="vendor-item-vendor">{item.vendor}</span>
            <span className="vendor-item-subscription">{item.subscription}</span>
            <span className="vendor-item-cosy"n>${item.cost}</span>
          </div>) : ""}
        {vendors.length ? <NavLink to="/goals" className="splash-button"> Set your goals! </NavLink> : ""}
      </Container>
      <div className="vendor-add-button" onClick={handleShow}>+</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="vendor-section">
            <div> Vendor Name: </div>
            <select name="vendors" id="vendors">
              <option value="Vendor 1">Vendor 1</option>
              <option value="Vendor 2">Vendor 2</option>
              <option value="Vendor 3">Vendor 3</option>
              <option value="Vendor 4">Vendor 4</option>
            </select>
          </div>
          <div className="vendor-section">
            <div>Subscription Type:</div>
            <select name="subscriptions" id="subscriptions">
              <option value="Subscription 1">Subscription 1</option>
              <option value="Subscription 2">Subscription 2</option>
              <option value="Subscription 3">Subscription 3</option>
              <option value="Subscription4">Subscription 4</option>
            </select>
          </div>
          <div className="vendor-section">
            <div>Monthly Cost: (optional)</div>
            <input id="cost"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            setVendors([...vendors,{
              vendor: document.querySelectorAll('select#vendors')[0].value,
              subscription: document.querySelectorAll('select#subscriptions')[0].value,
              cost: document.querySelectorAll('input#cost')[0].value
            }]); 
            handleClose();}
          }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Vendor;
