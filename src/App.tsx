import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Callback from './components/callback';
import Homepage from './components/home';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe9lNdaZEeFVwL9Gl2CLGocWuIOb5SeWM",
  authDomain: "github-repository-314b6.firebaseapp.com",
  projectId: "github-repository-314b6",
  storageBucket: "github-repository-314b6.appspot.com",
  messagingSenderId: "375735366764",
  appId: "1:375735366764:web:bcbd41976cdc90b51ed449",
  measurementId: "G-GC1RF7VTVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export interface AppProps {
  
}
 
const App: React.FunctionComponent<AppProps> = (props) => {

  // useEffect(() => {
  //   const provider = new GithubAuthProvider();

  //   const auth = getAuth();
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  //         const credential: any = GithubAuthProvider.credentialFromResult(result);
  //         const token = credential.accessToken;

  //         // The signed-in user info.
  //         const user = result.user;
  //         // ...
  //       }).catch((error) => {
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // The email of the user's account used.
  //         const email = error.email;
  //         // The AuthCredential type that was used.
  //         const credential = GithubAuthProvider.credentialFromError(error);
  //         // ...
  //       });
  // }, [])
  return ( 
  <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Callback />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
      
  </div> );
}


export default App;
