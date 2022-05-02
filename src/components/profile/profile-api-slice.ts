import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from '../app/store';
import {store} from '../app/store';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";


//const token = useSelector((state: RootState) => state.token.value)
//const state = store.getState()


export interface Repo {
    avatar_url: string,
    bio: string,
    blog: string,
    company: any,
    email: string,
    followers: number,
    follwing: number,
    html_url: string,
    id:number,
    location: any,
    login: string,
    name:string,
    public_repos:number,
    repos_url:string,
    twitter_username: any,
}

export const profileSlice: any = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/user',
        prepareHeaders: (headers, { getState }) => {
            const tokenCode = (getState() as RootState).token.value
            // const unsubscribe = subscribe(getState)
            
            // unsubscribe()

            // headers.set("Authorization", `token ${tokenCode}`)
            if(tokenCode){
                headers.set("Authorization", `token ${tokenCode}`)
            }

            return headers
        }
    }),
    endpoints(builder){
        return {
            fetchProfile: builder.query<Repo[], string | void> ({ 
                query(username){
                    return ``
                },
             })
        }
    }
});

export const { useFetchProfileQuery } = profileSlice;
