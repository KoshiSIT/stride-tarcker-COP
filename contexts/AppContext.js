import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    // map current location state
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isAccountPublic, setIsAccountPublic] = useState(false);
    const [language, setLanguage] = useState('日本語');
    // notification settings state
    const [withFovriteNotification, setWithFovriteNotification] = useState(false);
    const [withCommnetNotification, setWithCommnetNotification] = useState(false);
    const [withWorkoutNotification, setWithWorkoutNotification] = useState(false);
    const [withRunningGroupNotification, setWithRunningGroupNotification] = useState(false);
    const [withRaceNotification, setWithRaceNotification] = useState(false);
    const [withFollowerActivityNotification, setWithFollowerActivityNotification] = useState(false);
    const [withFollowerActivityNotificationF, setWithFollowerActivityNotificationF] = useState(false);
    const [withShoesNotification, setWithShoesNotification] = useState(false);
    const [withCharrengeNotification, setWithCharrengeNotification] = useState(false);
    const [withMotivationNotification, setWithMotivationNotification] = useState(false);
    // user profile state
    const [user, setUser] = useState('');
    const [weight, setWeight] = useState(60);
    const handleSetCurrentLocation = (location) => {
        setCurrentLocation(location);
    };
    const handleSetWeight = (weight) => {
        setWeight(weight);
    };
    const handleSetUser = (user) => {
        setUser(user);
    };
    
    const value = {
        language, setLanguage,
        currentLocation, handleSetCurrentLocation,
        weight, handleSetWeight,
        user, handleSetUser,
    }
    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}
