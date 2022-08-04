import { createContext, useReducer } from "react"
import { initalState, reducer } from "./reducer"

export const Store = createContext()

export default function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState)

    return (
        <Store.Provider value={{ state, dispatch }}>
                {children}
        </Store.Provider>
    )
}