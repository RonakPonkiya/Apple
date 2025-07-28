import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (username, password) => {
    const saved = JSON.parse(localStorage.getItem("signupData") || "{}");
    if (saved.username === username && saved.password === password) {
      localStorage.setItem("user", JSON.stringify({ username }));
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (data) => {
    localStorage.setItem("signupData", JSON.stringify(data))
    localStorage.setItem("user", JSON.stringify({username:data.username}))
    setUser({username:data.username})
    return true;
  } 

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user,login,signup,logout}}>
    {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
