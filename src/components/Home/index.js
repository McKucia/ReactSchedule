import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function Home() {
    const [userNickname, setUserNickname] = useState('');
    
    let location = useLocation();

    return (
        <div>Home</div>
    );
}

export default Home;