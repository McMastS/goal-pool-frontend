import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from './firebase';

type ProvideAuthParams = {
    children: React.ReactNode;
}

type Auth = {
    user: firebase.UserInfo | boolean | null,
    signin: Function,
    signup: Function,
    signout: Function,
}

const authContext = createContext<Auth | null>(null);

export const ProvideAuth = ({ children }: ProvideAuthParams) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = (): Auth => {
    const [user, setUser] = useState<firebase.UserInfo | boolean | null>(null);

    const signin = async (email: string, password: string) => {
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        setUser(response.user);
        return response.user;
    };

    const signup = async (email: string, password: string) => {
        const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        setUser(response.user);
        return response.user;
    }
    
    const signout = async () => {
        await firebase
            .auth()
            .signOut();
        setUser(false);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signin,
        signup,
        signout
    }
}
