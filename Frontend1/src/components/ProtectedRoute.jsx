import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import Login from '../User/Login';

const ProtectedRoute = ({element}) => {
    const  {isAuthenticated,loading}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    if(loading){
        return <Loader/>;
    }
    if(!isAuthenticated){
     return <Login/>;
    }
  return element;
}

export default ProtectedRoute
