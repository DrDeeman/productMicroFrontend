import React, {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import icon from '../assets/image/person.png';
const Users = React.lazy(()=>import('host/Users'));

export default function(props){

  return <div style={{width:'50px', height:'50px', border:'1px solid black', borderRadius:'50%', 
  backgroundImage:`url('${require('../assets/image/person.png')}')`, backgroundSize:'100% 100%', backgroundColor:'white',mbackgroundSize:'cover', backgroundRepeat:'no-repeat', 
  position:'absolute',margin:'20px',right:'0px',zIndex:100}} title="user cabinet not working"></div>

/*
    return <div>
        <Suspense fallback={<div>load...</div>}>
        <ErrorBoundary fallback={<div style={{width:'50px', height:'50px', border:'1px solid black', borderRadius:'50%', 
      backgroundImage:`url(${icon})`, backgroundColor:'white',mbackgroundSize:'cover', backgroundRepeat:'no-repeat', 
      position:'absolute',margin:'20px',right:'0px'}} title="user cabinet not working">
    </div>}>
            <Users/>
            </ErrorBoundary>
        </Suspense>
        </div>
    */
}