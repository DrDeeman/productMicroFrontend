import React from 'react';

export default function ProductUsers(props){

    return <div style={{display:'flex', flexWrap:'wrap',width:'100%',height:'100%',paddingTop:'100px'}}>
        {['test2','test3','test4','test5','test6','test7','test8'].map(p=>{
            return <div key={p} style={{width:'30%', height:'300px', border:'1px solid black', borderRadius:'5px', margin:'10px'}}>{p}</div>
        })}
    </div>
}