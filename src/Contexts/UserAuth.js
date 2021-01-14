import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createNewUser, changeUsername, changeAvatar } from "../api";
import Geocode from "react-geocode";
import { geocodeApi } from "../api";
Geocode.setApiKey(geocodeApi);
Geocode.setRegion("gb");

export const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (displayName, email, password, city, postcode) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = auth.currentUser;

      return user
        .updateProfile({
          displayName: displayName,
          photoURL:
            "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg",
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

  const changeDisplayName = (displayName) => {
    const user = auth.currentUser;
    return user.updateProfile({ displayName: displayName }).then(() => {
      changeUsername(user.uid, user.displayName).catch((err) => {
        console.log(err);
      });
    });
  };

  const changePhotoURL = (photoURL) => {
    const user = auth.currentUser;
    return user.updateProfile({ photoURL: photoURL }).then(() => {
      changeAvatar(user.uid, user.photoURL).catch((err) => {
        console.log(err);
      });
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logout,
    resetPassword,
    changeDisplayName,
    changePhotoURL,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
