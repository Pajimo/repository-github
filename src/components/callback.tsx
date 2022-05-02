import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";


export interface CallbackProps {
    
}
 
const Callback: React.FunctionComponent<CallbackProps> = (props) => {





    //console.log(new URLSearchParams(query))
    // const query = useLocation().search;
    // const code=new URLSearchParams(query).get("code");
    // console.log(code);


    // fetch('/callbackpage')
    // .then((response) => console.log(response.json()))
    // .then((data) => console.log(data))


    //   axios({
    //     method: 'post',
    //     url: 'https://github.com/login/oauth/access_token',
    //     // data: {
    //     //   firstName: 'Fred',
    //     //   lastName: 'Flintstone'
    //     // }
    //   });

    const [message, setMessage] = useState('')
    const {number} = useParams()

    useEffect(() => {
        if(number){
            setMessage('THere was a number')
        }else{
            setMessage('no message')
        }

    }, [])

    return ( 
        <div>
            This is the call back page
            {message}
        </div>
     );
}
 
export default Callback;