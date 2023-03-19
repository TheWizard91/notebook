import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase/firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // Creating the user no work is needed as firebase does it.
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    // Logging the user in.
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // Letting the user logging out
    function logout() {
        return auth.signOut()
    }
    
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    
    function setCurrentUserUID(currentUser) {
        return currentUser.uid
    }

    function setUserId() {
        return currentUser
    }

    useEffect(() => {       //  Set the user for us.
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })  
    
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        setUserId,
    }
    return (
        <AuthContext.Provider value = { value }>
            {!loading && children}
        </AuthContext.Provider>
    )
}
