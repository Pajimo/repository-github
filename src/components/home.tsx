import { useEffect, useState, useReducer } from "react";
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { useFetchProfileQuery, profileSlice } from "./profile/profile-api-slice";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "./app/store";
import { getUserProfile } from "./profile/token";
import { store } from "./app/store";
import { useNavigate } from 'react-router-dom';


export interface HomepageProps {
    
}

//console.log("yes",store.getState().token.value)

 
const Homepage: React.FunctionComponent<HomepageProps> = () => {

  const auth = getAuth();

    const navigate = useNavigate();

    const tokenCode3 = (store.getState()).token.value

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    
    const token1 = useSelector((state: RootState) => state.token.value)
    const dispatch = useDispatch()

    const [profileData, setProfileData]: any = useState([])
    const [tokenCode, setTokenCode]: any = useState('')
    const [loading, setLoading] = useState(false)
    const {data = [], isFetching, refetch} = useFetchProfileQuery()
    const [refetchData, setRefetch] = useState(false)
    const [userRepo, setUserRepo] = useState([])

    function handleRefetchTwo() {
      // has the same effect as `refetch` for the associated query
      setLoading(true)
      dispatch(
        profileSlice.endpoints.fetchProfile.initiate('Username')
      )
      setRefetch(!refetchData)
    }

    const getRepoProfile = () => {
        setLoading(true)
        const provider = new GithubAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then(async(result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential: any = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
          // ...
            // The signed-in user info.
            const user = result.user;
            dispatch(getUserProfile(token))
            
            setTimeout(() => {
              handleRefetchTwo()
            }, 2000)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
          });
    }

    const fetchRepos = async() => {
      const res = await fetch("https://api.github.com/users/Pajimo/repos")
      const data = await res.json()
      setUserRepo(data)
    }

    useEffect(() => {
        //window.location.reload()
        const tokenCodes3 = (store.getState()).token.value
        //useFetchProfileQuery
        //dispatch(useFetchProfileQuery())
        //setLoading(true)
        // dispatch(getUserProfile(token))
        setTimeout(() => {
          refetch()
          fetchRepos()
          setLoading(false)
        }, 2000)
        // //setProfileData(data)
    }, [tokenCode, refetchData])

    // useEffect(() => {
    //   setProfileData(data)
    //   setLoading(false)
    // }, [refetch])

   if(loading){
       return(
          <div className="bg-gradient-to-r from-gray-300 to-slate-700 h-screen">
             <p className=" font-bold text-4xl flex justify-center pt-72">Loading.....</p>
          </div>
       )
   }


   if(!auth.currentUser){
     return(
       <div className='flex justify-center border-2 mx-5 md:mx-40 mt-10'>
         <div className="py-5">
          <p className="text-center text-2xl font-semibold text-gray-700">Welcome to the github user repo application</p>
          <p className="mt-10 text-lg font-semibold text-gray-500">Autenticate by clicking login below to get users repository</p>
          <button className="mt-10 w-full bg-gray-200 shawdow-2xl font-semibold text-lg py-2 rounded-xl" onClick={getRepoProfile}>LogIn</button>
         </div>
       </div>
     )
   }

   const signOutProfile = () => {
     setLoading(true)
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    setTimeout(() => {
      setLoading(false)
    }, 2000)
   }
   
    return ( 
    <div className="md:mx-40 pt-10">
        {data ? 
        <div className="flex flex-row">
          <div className=" basis-1/4 mr-7">
              <img  src={data.avatar_url} alt={data.name} className='rounded-full md:h-74'/>
              <p className="text-2xl font-semibold mt-5">{data.name}</p>
              <p className="text-2xl font-light mt-1">{data.login}</p>
              <p className="mt-5">{data.bio}</p>
              <button className="w-full bg-gray-100 shadow-2xl mt-5 py-1 font-semibold border-2 border-gray-200">Edit Profile</button>
              <div className="flex text-sm mt-5">
                <p className="mr-2"><span className="font-semibold">{data.followers}</span> followers</p>
                <p><span className="font-semibold">{data.following}</span> following</p>
              </div>
              <p className="mt-5 text-sm">{data.location}</p>
              <p className="mt-2 text-sm">{data.email}</p>
              <p className="mt-2 text-sm">{data.twitter_username}</p>
              <p className="mt-2 text-sm">{data.blog}</p>
          </div>
          <div className="basis-3/4">
            <div className="flex justify-end mb-5">
              <button className="text-right px-5 py-1 rounded-xl text-xl bg-gray-200 shadow-2xl" onClick={signOutProfile}>SignOut</button>
            </div>
            {userRepo.map((repo:any) => {
              return(
                <div key={repo.id} className='border-t-2 py-5'>
                  <p className="text-blue-600 font-semibold text-xl">{repo.name}</p>
                  <p>{repo.description}</p>
                  <div className="flex flex-wrap">
                    {repo.topics.map((topic:any) => {
                      return(
                        <div className="mr-2 mt-7 text-blue-600 bg-sky-100 rounded-xl text-sm px-2 py-1">
                          <p>{topic}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
         : ''}
      </div>
     );
}
 
export default Homepage;