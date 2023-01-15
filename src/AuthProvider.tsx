import React, {
    ReactNode,
    useEffect,
    useState,
    useContext,
    createContext,
} from 'react'
import { auth } from './config/.firebaseSetup'
import {
    Auth,
    UserCredential,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth'
import {bool} from "yup";

export interface AuthProviderProps {
    children? : ReactNode
}


export interface UserContextState {
    isAuthenticated: boolean
    isLoading: boolean
    id? : string
}

export const UserStateContext = createContext<UserContextState>({} as UserContextState)

export interface AuthContextModel {
    auth: Auth
    user: User | null
    signIn: (email: string, password: string) => Promise<UserCredential>
    signUp: (email: string, password: string) => Promise<UserCredential>
    sendPasswordResetEmail?: (email: string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

export const AuthContext = React.createContext<AuthContextModel>({} as AuthContextModel)

export function useAuth(): AuthContextModel {
    return useContext(AuthContext)
}

export const AuthProvider = ( { children }: AuthProviderProps) : JSX.Element => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    console.log(loading)

    function signUp(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email:string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email: string): Promise<void> {
        return sendPasswordResetEmail(auth, email)
    }

    function logout(): Promise<void> {
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const values = {
        loading,
        signUp,
        user,
        signIn,
        resetPassword,
        auth,
        logout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;


}


export const useUserContext = (): UserContextState => {
    return useContext(UserStateContext)
}

