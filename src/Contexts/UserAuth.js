import React, { useContext, useState, useEffect } from "react";
import { auth, user } from "../firebase";
import { createNewUser, changeUsername } from "../api";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (displayName, email, password) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = auth.currentUser;
      return user
        .updateProfile({
          displayName: displayName,
        })
        .then(() => {
          return user.sendEmailVerification();
        })
        .then(() => {
          createNewUser(user.uid, user.displayName, user.email);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signUp, logIn, logout, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
