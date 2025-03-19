import React, { useEffect, useRef, useState } from 'react';
import profilePhoto from '../../assets/pfp.png';

const Hero = () => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        let mounted = true;

        const initVantaEffect = () => {
            if (!mounted || vantaEffect || !window.VANTA) return;

            const effect = window.VANTA.NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: window.innerHeight,
                minWidth: window.innerWidth,
                scale: 1.00,
                scaleMobile: 0.75,
                color: 0x3b82f6,
                backgroundColor: 0xffffff,
                points: 15.00,
                maxDistance: 25.00,
                spacing: 20.00,
                showDots: true,
                frameRate: 30 // Limit frame rate for better performance
            });

            if (mounted) {
                setVantaEffect(effect);
            } else {
                effect.destroy();
            }
        };

        // Debounce resize handler
        const handleResize = () => {
            if (vantaEffect) {
                vantaEffect.resize();
            }
        };

        const debouncedResize = debounce(handleResize, 250);

        window.addEventListener('resize', debouncedResize);
        initVantaEffect();

        return () => {
            mounted = false;
            if (vantaEffect) {
                vantaEffect.destroy();
            }
            window.removeEventListener('resize', debouncedResize);
        };
    }, [vantaEffect]);

    // Debounce utility function
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    return (
        <div ref={vantaRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6">
            <div className="text-center space-y-6 sm:space-y-8 relative z-10 py-8 sm:py-12 md:py-16 w-full max-w-4xl">
                <div className="relative group">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full mx-auto relative">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 
                            relative transition-all duration-300 ease-out group-hover:scale-105
                            group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
                            active:scale-95 sm:active:scale-100">
                            <div className="w-full h-full rounded-full bg-white p-2 sm:p-3 relative">
                                <img 
                                    src={profilePhoto}
                                    alt="Dev Mondal"
                                    className="w-full h-full rounded-full object-cover 
                                        transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-2 right-1/3 bg-white rounded-full p-1.5 sm:p-2 shadow-lg
                        transition-all duration-300 ease-out group-hover:scale-105
                        group-hover:translate-y-[-2px]">
                        <i className="fas fa-code text-lg sm:text-xl md:text-2xl text-blue-500"></i>
                    </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4 font-inter backdrop-blur-sm bg-white/30 rounded-xl p-4 sm:p-6
                    mx-auto max-w-[90%] sm:max-w-full">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-gray-800 tracking-tight
                        leading-tight">
                        Dev Mondal
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
                        Full Stack Developer | Problem Solver | Tech Enthusiast
                    </p>
                    <div className="flex justify-center space-x-6 sm:space-x-8 pt-2 sm:pt-4">
                        <a 
                            href="https://github.com/DevxD98" 
                            className="text-gray-600 hover:text-gray-900 transition-colors p-2 sm:p-3
                                hover:bg-gray-100/50 rounded-full active:scale-95"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github text-lg sm:text-xl md:text-2xl"></i>
                        </a>
                        <a 
                            href="https://www.linkedin.com/feed/" 
                            className="text-gray-600 hover:text-gray-900 transition-colors p-2 sm:p-3
                                hover:bg-gray-100/50 rounded-full active:scale-95"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin text-lg sm:text-xl md:text-2xl"></i>
                        </a>
                        <a 
                            href="mailto:mondaldev75@gmail.com" 
                            className="text-gray-600 hover:text-gray-900 transition-colors p-2 sm:p-3
                                hover:bg-gray-100/50 rounded-full active:scale-95"
                        >
                            <i className="fas fa-envelope text-lg sm:text-xl md:text-2xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
