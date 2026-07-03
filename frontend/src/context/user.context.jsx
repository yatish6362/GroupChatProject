import React, { createContext, useState } from 'react'
export const UserContext=createContext()

const UserProvider = ({children}) => {
    const [user, setuser] = useState(null)
  return (
    <UserContext.Provider value={{user,setuser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider