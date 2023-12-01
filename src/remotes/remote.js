import React, {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import icon from '../assets/image/person.png';
const Users = React.lazy(()=>import('host/Users'));

export default function(props){


    return <div>
        <Suspense fallback={<div>load...</div>}>
        <ErrorBoundary fallback={<div style={{width:'50px', height:'50px', border:'1px solid black', borderRadius:'50%', 
      backgroundImage:`url(${icon})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', 
      position:'absolute',margin:'20px',right:'0px'}} title="user cabinet not working">
    </div>}>
            <Users/>
            </ErrorBoundary>
        </Suspense>
        </div>
    
}