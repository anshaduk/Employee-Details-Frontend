import React, { createContext, useContext, useState } from 'react'

export const myContext = createContext()
const UserContext = ({ children }) => {
    const [picture, setPicture] = useState(null)
    return (
        <myContext.Provider value={[picture, setPicture]}>
            {children}
        </myContext.Provider>
    )
}

export default UserContext
