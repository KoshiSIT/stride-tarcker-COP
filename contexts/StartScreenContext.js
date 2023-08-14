import { createContext, useState, useContext } from 'react';

const StartScreenContext = createContext();

export function useStartScreenContext() {
    return useContext(StartScreenContext);
}

export function StartScreenProvider({ children }) {
    //page 1 state
    const [stopWatchMode, setStopWatchMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('ウォーキング');
    //page 4 state
    const [withAudioGuide, setWithAudioGuide] = useState(false);
    const [typeOfAudioGuide, setTypeOfAudioGuide] = useState('kat(デフォルト)');
    const [withAnnouncement, setWithAnnouncement] = useState(false);
    const [withIntervalTime, setWithIntervalTime] = useState(false);
    const [withIntervalDistance, setWithIntervalDistance] = useState(false);
    const [intervalTime, setIntervalTime] = useState(0);
    const [intervalDistance, setIntervalDistance] = useState(0);
    const [announcementInfo, setAnnouncementInfo] = useState('');
    const [volume, setVolume] = useState(50);
    // other state
    const [rroute, setRroute] = useState('なし');
    const [withAutoPause, setWithAutoPause] = useState(false);
    const [withCountDown, setWithCountDown] = useState(false);
    const [withLiveTracking, setWithLiveTracking] = useState(false);
    const [withPocketTrack, setWithPocketTrack] = useState(false);
    const [height, setHeight] = useState(90);
    const [unitOfDistance, setUnitOfDistance] = useState('km');
    const [unitOfSpeed, setUnitOfSpeed] = useState('km/h');

    //page 1 handler
    const handleStopWatchMode = () => {
        setStopWatchMode(!stopWatchMode);
    };

    const handleSelectActivity = (activity) => {
        setSelectedActivity(activity);
        console.log(activity);
    };

    //page 4 handler
    const handleWithAudioGuide = () => {
        setWithAudioGuide(!withAudioGuide);
    }
    const handleVolumeChange = (value) => {
        setVolume(value);
      };
    const handleTypeOfAudioGuide = (type) => {
        setTypeOfAudioGuide(type);
    };
    const handleWithAnnouncement = () => {
        setWithAnnouncement(!withAnnouncement);
    };
    const handleWithIntervalTime = () => {
        setWithIntervalTime(!withIntervalTime);
    };
    const handleWithIntervalDistance = () => {
        setWithIntervalDistance(!withIntervalDistance);
    };
    const handleIntervalTime = (value) => {
        setIntervalTime(value);
    };
    const handleIntervalDistance = (value) => {
        setIntervalDistance(value);
    };

    const handleAnnouncementInfo = (info) => {
        setAnnouncementInfo(info);
    };
    //other handler
    const handleRroute = (route) => {
        setRroute(route);
    };
    const handleWithAutoPause = () => {
        setWithAutoPause(!withAutoPause);
    };
    const handleWithCountDown = () => {
        setWithCountDown(!withCountDown);
    };
    const handleWithLiveTracking = () => {
        setWithLiveTracking(!withLiveTracking);
    };
    const handleWithPocketTrack = () => {
        setWithPocketTrack(!withPocketTrack);
    };
    const handleHeight = (value) => {
        setHeight(value);
    };
    const handleUnitOfDistance = (unit) => {
        setUnitOfDistance(unit);
    };
    const handleUnitOfSpeed = (unit) => {
        setUnitOfSpeed(unit);
    };
    
    const value = {
        //page 1 state
        stopWatchMode, handleStopWatchMode,
        selectedActivity, handleSelectActivity,
        //page 4 state
        withAudioGuide, handleWithAudioGuide,
        typeOfAudioGuide, handleTypeOfAudioGuide,
        withAnnouncement, handleWithAnnouncement,
        withIntervalTime, handleWithIntervalTime,
        withIntervalDistance, handleWithIntervalDistance,
        intervalTime, handleIntervalTime,
        intervalDistance, handleIntervalDistance,
        announcementInfo, handleAnnouncementInfo,
        volume, handleVolumeChange,
        //other state
        rroute, handleRroute,
        withAutoPause, handleWithAutoPause,
        withCountDown, handleWithCountDown,
        withLiveTracking, handleWithLiveTracking,
        withPocketTrack, handleWithPocketTrack,
        height, handleHeight,
        unitOfDistance, handleUnitOfDistance,
        unitOfSpeed, handleUnitOfSpeed,
    };

    return (
        <StartScreenContext.Provider value={value}>{children}</StartScreenContext.Provider>
    );
    
}