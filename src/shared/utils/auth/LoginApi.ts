import firebase from './firebase';

export const userLogin = async (email: string, password: string) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export const userRegister = async (email: string, password: string) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
}
