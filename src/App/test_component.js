import React,{useState, useEffect} from 'react';
import './styles/style.scss';

export default function ProductUsers(props){

    const [data, setData] = useState([]);

     useEffect(()=>{
        fetch('/products_api/products/',{
            method:"GET",
            headers:{
                "accept":'application/json'
            }
        })
        .then(responce=>responce.json())
        .then(result=>setData(result))
     },[]);

    return <div className="showcase">
        {data.map(p=>{
            return <div key={p.name} className="element" style={{
                backgroundImage:`url(data:image/png;base64,${p.image})`
            }} title={p.name+' (Дата выхода:'+p.year_issue+')'}>
                <span className='price'>{p.price+' р.'}</span>
                <span className='raiting' style={{backgroundColor:(p.raiting>4.0?'green':'red')}}>{p.raiting} &#10026;</span>
            </div>
        })}
    </div>
}