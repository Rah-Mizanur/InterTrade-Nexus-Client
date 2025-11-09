import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [loading ,setLoading] = useState(true)
     const googleProvider = new GoogleAuthProvider();
    // console.log(loading,user)

    const updateUser = (updatedData)=>{
           return updateProfile  (auth.currentUser , updatedData)
    }
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword (auth ,email,password)
    }

    const signInUser = (email, password)=>{
           setLoading(true)
        return signInWithEmailAndPassword (auth ,email , password)
    }

    const logOutUser = ()=>{
        return signOut(auth)
    }

   

 const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth ,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        });
        return ()=>{
            unsubscribe()
        }
    },[])
    const authData = {
        user,
        setUser,
        createUser,
        logOutUser,
        signInUser,
        loading,
        setLoading,
        updateUser,
        signInWithGoogle
    }
  return <AuthContext value={authData}>{children}</AuthContext>
}

export default AuthProvider
