import React from 'react';
import './NeonGradient.css';

const NeonGradient = ({ hoveredCircle }) => {
    return (
        <div className={`neon-gradient-background ${hoveredCircle !== null ? 'active' : ''}`}>
            {[0, 1, 2, 3].map((index) => (
                <div
                    key={index}
                    className={`neon-gradient-${index}`}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: hoveredCircle === index ? 1 : 0,
                        transition: 'opacity 0.5s ease'
                    }}
                />
            ))}
        </div>
    );
};

export default NeonGradient;