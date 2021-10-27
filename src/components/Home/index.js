import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import LineChart from '../LineChart';

function Home() {
    const [userNickname, setUserNickname] = useState('');
    
    let location = useLocation();
    

    return (
        <LineChart/>
    );
}

export default Home;