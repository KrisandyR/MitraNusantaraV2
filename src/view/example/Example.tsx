import React, { Fragment, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { login, logout, authSelector } from '../../redux/auth.reducer';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const Example = () => {

  const dispatch = useDispatch();
  const b = useSelector(authSelector);

  console.log(b.isLoggedIn)
  console.log(b.userId)

  // if(!b){
  //   console.log("undefined")
  // }

  return (
    <div className='example'>
      <p>aaaaaaa</p>
      <br/>
      <p>{b.status}</p>
      <p>{b.userId}</p>
      <br/>
    </div>
  )
};

// mapStateToProps here if needed

// mapDispatchToProps here if needed

export default Example;
