import React, { useState } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setUser] = useState(null);

  const setLoggedInUser = (loggedInUser) => {
    setUser(loggedInUser);
  };
  return <UserContext.Provider value={{ data: loggedInUser, setLoggedInUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
