import React, { useContext, useState, useEffect } from "react";
import { auth, user } from "../firebase";
import { createNewUser, changeUsername } from "../api";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBzdjkehz-69slvbPIwKPOVGzIkG_fuU3I");
Geocode.setRegion("gb");

export const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});

  const signUp = (displayName, email, password, city, postcode) => {
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
          Geocode.fromAddress(`${city} ${postcode}`).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              const location = [];
              location.push(lat, lng);
              createNewUser(user.uid, user.displayName, user.email, location);
            },
            (error) => {
              console.error(error);
            }
          );
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
