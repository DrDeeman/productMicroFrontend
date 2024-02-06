import React, {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import icon from '../assets/image/person.png';
const Users = React.lazy(()=>import('host/Users'));

export default function(props){


    return (
        <Suspense fallback={<div>load...</div>}>
        <ErrorBoundary fallback={<img src={icon} style={{width:'50px', height:'50px', border:'1px solid black', borderRadius:'50%', 
   backgroundColor:'white',
  position:'absolute',margin:'20px',right:'0px',zIndex:100}} title="user cabinet not working"></img>}>
            <Users/>
            </ErrorBoundary>
        </Suspense>
    )
        
    
}