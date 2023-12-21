import './Vendor.css'; 

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { NavLink } from "react-router-dom";

const data = {
  "Equinox" : {
    "subscriptions" : []
  },
  "Calm" : {
    "subscriptions" : ["Monthly", "Annual"]
  },
  "Smothiebox" : {
    "subscriptions" : ["SmoothieBox Classic","SmoothieBox Family","SmoothieBox Custom"]
  },
  "Nu" : {
    "subscriptions" : []
  },
  "Trifecta" : {
    "subscriptions" : []
  },
  "Talkspace" : {
    "subscriptions" : ["Individual Therapy (Live Sessions + Messaging)","Individual Therapy (Live Sessions Unlimited)","Couples Therapy (Live Sessions + Messaging)","Couples Therapy (Live Sessions Unlimited)","Coaching (Live Sessions + Messaging)","Coaching (Live Sessions Unlimited)"]
  },
  "Martha & Marley Spoon" : {
    "subscriptions" : []
  },
  "Daily Harvest" : {
    "subscriptions" : []
  },
  "Every Plate" : {
    "subscriptions" : []
  },
  "Hungry Root" : {
    "subscriptions" : []
  },
  "Headspaces" : {
    "subscriptions" : ["Annual"]
  },
  "Fitbit" : {
    "subscriptions" : []
  },
  "Peloton" : {
    "subscriptions" : ["All-Access Membership","App Membership","Digital Membership"]
  },
  "Weight Watchers" : {
    "subscriptions" : []
  },
  "Planet Fitness" : {
    "subscriptions" : []
  }
};

function Vendor() {
  const [show, setShow] = useState(false);
  const [vendors, setVendors] = useState([]);

  const [modalVendor, setModalVendor] = useState(null);
  const [modalPossibleSubs, setModalPossibleSubs] = useState(null);
  const [modalSubscription, setModalSubscription] = useState(null);

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
            <select name="vendors" id="vendors" value={modalVendor} onChange={(e)=>{
              setModalVendor(e.target.value);
              setModalPossibleSubs(data[e.target.value].subscriptions);
            }}>
              {Object.keys(data).map((vendor)=><option value={vendor}>{vendor}</option>)}
            </select>
          </div>
          <div className="vendor-section">
            <div>Subscription Type:</div>
            <select name="subscriptions" id="subscriptions" value={modalSubscription} onChange={(e)=>{
              setModalSubscription(e.target.value);
            }}>
              {modalVendor? data[modalVendor].subscriptions.map((sub)=><option value={sub}>{sub}</option>) : ""}
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
