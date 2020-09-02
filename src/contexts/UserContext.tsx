import React, { createContext, useState } from 'react';

const defaultUserDetails = {
  userDetails: {name: null, email: null, avatar_url: null},
  setDetails: (userDetails: any) => {},
};

const UserContext = createContext(defaultUserDetails);

const UserProvider: React.FC = ({ children }) => {

 const setDetails = (userDetails: any) => {
   setUserDetails( (prevState)=>{ return{...prevState, userDetails: userDetails }});
 };
 const defaultState = {
   userDetails: { name: null, email: null, avatar_url: null },
   setDetails,
 };
  const [userDetails, setUserDetails] = useState(defaultState);

  return (
    <UserContext.Provider value={userDetails}>
        {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
