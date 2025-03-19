import React, { useState } from 'react';
import './About.css';
import SemiCircularRipple from '../ui/SemiCircularRipple';

const About = () => {
    const [hoveredCircle, setHoveredCircle] = useState(null);

    return (
        <div className="group relative min-h-screen flex items-center justify-center text-white p-4 sm:p-8">
            <SemiCircularRipple hoveredCircle={hoveredCircle} setHoveredCircle={setHoveredCircle} />
        </div>
    );
};

export default About;