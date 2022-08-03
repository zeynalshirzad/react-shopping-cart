import { useReducer } from "react"
import { AuthDispatchContext, AuthStateContext } from "./auth-context"
import { initalState, reducer } from "./reducer"

export default function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState)
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}