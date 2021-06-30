import React, { useEffect } from 'react';
import axios from '../axios/index';

function User(props) {
    const fetchApi = async ()=>{
        try{
            const res = await axios.get("/get");
            console.log(res);
        }catch(err){
            console.log(err);
            console.log(err.name);
        }
    }
    useEffect(()=>{
        fetchApi();
    }, [])
    return (
        <div>
            Đây là trang khiêm
        </div>
    );
}

export default User;