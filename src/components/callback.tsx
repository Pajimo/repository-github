import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export interface CallbackProps {
    
}
 
const Callback: React.FunctionComponent<CallbackProps> = (props) => {


const navigate = useNavigate()


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

    const gotoHomePage = () => {
        navigate("/homepage")
    }
    return ( 
        <div>
            <div className='flex justify-center border-2 mx-5 md:mx-40 mt-10'>
                <div className="py-5">
                <p className="text-center text-2xl font-semibold text-gray-700">Welcome to the github user repo application</p>
                <p className="mt-10 text-lg font-semibold text-gray-500">Autenticate by clicking login below to get users repository</p>
                <button className="mt-10 w-full bg-gray-200 shawdow-2xl font-semibold text-lg py-2 rounded-xl" onClick={gotoHomePage}>LogIn</button>
                </div>
            </div>
        </div>
     );
}
 
export default Callback;