import React, { useContext } from 'react'

export const AuthStateContext = React.createContext()
export const AuthDispatchContext = React.createContext()

export const useAuthState = () => {
    const context = useContext(AuthStateContext)
    if(!context){
        throw Error('useAuthState must be used with a AuthProvider')
    }
    return context
}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext)
    if(!context){
        throw Error('useAuthDispatch must be used with a AuthProvider')
    }
    return context
}