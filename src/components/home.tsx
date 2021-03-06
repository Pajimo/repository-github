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

    //const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    
    //const token1 = useSelector((state: RootState) => state.token.value)
    const dispatch = useDispatch()

    const [profileData, setProfileData]: any = useState([])
    const [tokenCode, setTokenCode]: any = useState('')
    const [loading, setLoading] = useState(false)
    const {data = [], isFetching, refetch} = useFetchProfileQuery()
    const [refetchData, setRefetch] = useState(false)
    const [userRepo, setUserRepo] = useState([])

    // function handleRefetchTwo() {
    //   // has the same effect as `refetch` for the associated query
    //   setLoading(true)
    //   dispatch(
    //     profileSlice.endpoints.fetchProfile.initiate('Username')
    //   )
    //   setRefetch(!refetchData)
    // }

    const getRepoProfile = () => {
        
    }

    const fetchRepos = async() => {
      const res = await fetch(`https://api.github.com/users/${data.login}/repos?page=1&per_page=20`)
      const repoData = await res.json()
      setUserRepo(repoData)
    }

    useEffect(() => {
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
            refetch()
            setLoading(false)
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
    }, [])

    // useEffect(() => {
    //     //window.location.reload()
    //     const tokenCodes3 = (store.getState()).token.value
    //     //useFetchProfileQuery
    //     //dispatch(useFetchProfileQuery())
    //     //setLoading(true)
    //     setTimeout(() => {
    //       refetch()
    //       fetchRepos()
    //       setLoading(false)
    //     }, 1000)
    //     if(userRepo){console.log(userRepo.sort(function(a: any, b: any){
    //       // Turn your strings into dates, and then subtract them
    //       // to get a value that is either negative, positive, or zero.
    //       return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    //     }))}
    //     // //setProfileData(data)
    // }, [tokenCode])


    useEffect(() => {
      if(data){
        fetchRepos()
      }
    }, [data])



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

   const signOutProfile = () => {
     setLoading(true)
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
    setTimeout(() => {
      setLoading(false)
    }, 2000)
   }

   //console.log(auth.currentUser)
    return ( 
    <div className="">
      <div className="bg-gray-800 mx-0 py-3 flex justify-end">
        <button className="text-white py-1 text-xl px-12" onClick={signOutProfile}>SignOut</button>
      </div>
      <div className="md:mx-40 pt-10">
        {data ? 
        <div className="flex flex-row">
          <div className=" basis-1/4 mr-7">
              <img  src={data.avatar_url} alt={data.name} className='rounded-full md:h-74'/>
              <p className="text-2xl font-semibold mt-5">{data.name}</p>
              <p className="text-xl font-light">{data.login}</p>
              <p className="mt-3">{data.bio}</p>
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
            <div className="mb-5">
              <p className=" pb-3 mb-3 border-b-2 font-semibold ">Repositories {userRepo.length}</p>
            </div>
            <input placeholder="Find a repository.... " className="border-2 py-1 w-2/3 rounded-lg mb-3 text-sm px-3"/>
            {userRepo ? userRepo.map((repo:any) => {
              return(
                <div key={repo.id} className='border-t-2 py-5 flex justify-between items-center'>
                  <div className="">
                    <p className="text-blue-600 font-semibold text-xl">{repo.name}</p>
                    <p className="text- text-gray-600">{repo.description}</p>
                    <div className="flex flex-wrap">
                      {repo.topics.map((topic:any) => {
                        return(
                          <div className="mr-2 mt-7 text-blue-600 bg-sky-100 rounded-xl text-sm px-2 py-1">
                            <p>{topic}</p>
                          </div>
                        )
                      })}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-500">{repo.language}</p>
                  </div>
                  <div >
                      <p className="bg-slate-100 py-1 px-10 border-2 border-gray-200 text-sm font-semibold rounded-lg">Star</p>
                      <p className="border-b-2 border-green-400 pb-5"></p>

                  </div>
                </div>
              )
            }) : ''}
          </div>
        </div>
        
         : ''}
         </div>
      </div>
     );
}
 
export default Homepage;