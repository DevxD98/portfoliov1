import React, { useState, useEffect, useRef } from 'react';
import './Music.css';  // Import the CSS file

// Import all artist images
import theWeeknd from '../../assets/artists/the-weeknd.png';
import michaelJackson from '../../assets/artists/michael-jackson.png';
import lanaDelRey1 from '../../assets/artists/lana-del-rey-1.png';  // Red outfit image
import lanaDelRey2 from '../../assets/artists/lana-del-rey-2.png';  // White outfit image
import travisScott from '../../assets/artists/travis-scott.png';
import theWeekndFuture from '../../assets/artists/the-weeknd-future.png';

// Create the mapping object
const artistImages = {
  'The Weeknd': theWeeknd,
  'Michael Jackson': michaelJackson,
  'Lana Del Rey': [lanaDelRey1, lanaDelRey2],  // Array of images for random selection
  'Travi$ Scott': travisScott,  // Note: Using the exact name from Last.fm
  'The Weeknd & Future': theWeekndFuture,
};

const LoadingCard = () => (
    <div className="flex items-center space-x-4 sm:space-x-6 p-3 sm:p-4 rounded-lg loading-card">
        <div className="text-2xl sm:text-3xl w-8 sm:w-12 flex-shrink-0">
            <div className="h-6 sm:h-8 w-6 sm:w-8 bg-gray-700/50 rounded-full animate-shimmer"></div>
        </div>
        <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-full overflow-hidden bg-gray-700/50 animate-shimmer flex-shrink-0"></div>
        <div className="flex-1 space-y-2 sm:space-y-3">
            <div className="h-4 sm:h-5 bg-gray-700/50 rounded w-3/4 animate-shimmer"></div>
            <div className="h-3 sm:h-4 bg-gray-700/50 rounded w-1/2 animate-shimmer"></div>
        </div>
    </div>
);

const LoadingTrackCard = () => (
    <div className="flex items-center space-x-4 sm:space-x-6 p-3 sm:p-4 rounded-lg loading-card">
        <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg bg-gray-700/50 animate-shimmer flex-shrink-0"></div>
        <div className="flex-1 space-y-2 sm:space-y-3">
            <div className="h-4 sm:h-5 bg-gray-700/50 rounded w-3/4 animate-shimmer"></div>
            <div className="h-3 sm:h-4 bg-gray-700/50 rounded w-1/2 animate-shimmer"></div>
        </div>
        <div className="h-3 sm:h-4 w-16 sm:w-24 bg-gray-700/50 rounded animate-shimmer hidden sm:block"></div>
    </div>
);

// Add this new component at the top level
const ArtistCard = ({ artist, index, apiKey }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        // Handle random image selection for Lana Del Rey
        if (artist.name === 'Lana Del Rey') {
            const randomIndex = Math.floor(Math.random() * artistImages[artist.name].length);
            setImageUrl(artistImages[artist.name][randomIndex]);
        } else {
            setImageUrl(artistImages[artist.name] || null);  // Use null if artist not found
        }
    }, [artist.name]);

    // Fallback avatar generation
    const getFallbackAvatar = () => {
        const gradients = [
            '7F00FF,E100FF', // Electric Purple
            'FF0099,493240', // Neon Pink to Dark Purple
            '00C9FF,92FE9D', // Electric Blue to Mint
            'FF6B6B,556270', // Coral to Slate
            'FD746C,2C3E50'  // Sunset to Night
        ];
        const gradientIndex = index % gradients.length;
        const initials = artist.name
            .split(' ')
            .slice(0, 2)
            .map(word => word?.[0] || '')
            .join('')
            .toUpperCase();

        return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&bold=true&background=${gradients[gradientIndex]}&color=fff&size=256&length=2`;
    };

    return (
        <div className="flex items-center space-x-3 sm:space-x-6 group hover:bg-white/5 p-3 sm:p-4 rounded-lg transition-all duration-300 content-card">
            <div className="text-2xl sm:text-3xl music-heading text-white w-8 sm:w-12 flex-shrink-0">
                {index + 1}
            </div>
            <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center relative shadow-lg flex-shrink-0">
                {imageUrl ? (
                    <img 
                        src={imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                        onError={(e) => {
                            console.log(`Image load error for ${artist.name}`);
                            e.target.src = getFallbackAvatar();
                        }}
                    />
                ) : (
                    <img 
                        src={getFallbackAvatar()}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                    />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-xl music-heading text-white truncate">
                    {artist.name}
                </h4>
                <p className="text-sm sm:text-base text-gray-400 music-text">
                    {Math.round(artist.playcount * 3)} minutes
                </p>
            </div>
        </div>
    );
};

const Music = () => {
    const [recentTracks, setRecentTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);
    
    const LASTFM_API_KEY = '2876b4794c2cfb64cb42e52108971fed';
    const LASTFM_USERNAME = 'whooissdev';

    // Initialize Vanta effect with proper cleanup and performance optimization
    useEffect(() => {
        let mounted = true;

        const initVantaEffect = () => {
            if (!mounted || vantaEffect || !window.VANTA) return;

            const effect = window.VANTA.HALO({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                amplitudeFactor: 1.40,
                xOffset: -0.02,
                yOffset: 0.01,
                size: 1.90,
                scaleMobile: 0.75,
                backgroundColor: 0x0a0a0a,
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

    // Fetch music data
    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                setLoading(true);
                setError(null);

                const recentTracksUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5`;
                const topArtistsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5&period=1month`;

                const [tracksResponse, artistsResponse] = await Promise.all([
                    fetch(recentTracksUrl),
                    fetch(topArtistsUrl)
                ]);

                const tracksData = await tracksResponse.json();
                const artistsData = await artistsResponse.json();

                console.log("Top Artists API Response:", artistsData);

                if (artistsData.topartists?.artist) {
                    const formattedArtists = artistsData.topartists.artist.map(artist => ({
                        ...artist,
                        image: artist.image || [] // Ensure image is always an array
                    }));
                    console.log("Formatted Artists:", formattedArtists);
                    setTopArtists(formattedArtists);
                } else {
                    console.error("No artists data found in response:", artistsData);
                }

                if (tracksData.recenttracks?.track) {
                    setRecentTracks(Array.isArray(tracksData.recenttracks.track) 
                        ? tracksData.recenttracks.track 
                        : [tracksData.recenttracks.track]);
                }

                setLoading(false);
            } catch (error) {
                console.error('API Error:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMusicData();
        const interval = setInterval(fetchMusicData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center p-6 sm:p-8 rounded-lg bg-red-50 max-w-md w-full">
                    <h3 className="text-lg sm:text-xl font-semibold text-red-800 mb-2">Music Data Error</h3>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={vantaRef} className="relative min-h-screen">
            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-[100px]" />
            
            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
                <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl music-title text-white mb-3 sm:mb-4">
                            Music that defines me
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 auto-rows-min">
                            {/* Top Artists Loading Section */}
                            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 shadow-xl section-container">
                                <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                                    <div className="h-6 sm:h-8 bg-gray-700/50 rounded w-1/3 animate-shimmer"></div>
                                    <div className="h-4 sm:h-5 bg-gray-700/50 rounded w-1/4 animate-shimmer"></div>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <LoadingCard key={i} />
                                    ))}
                                </div>
                            </div>

                            {/* Recently Played Loading Section */}
                            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 shadow-xl section-container">
                                <div className="mb-4 sm:mb-6">
                                    <div className="h-6 sm:h-8 bg-gray-700/50 rounded w-1/3 animate-shimmer"></div>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <LoadingTrackCard key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 auto-rows-min">
                            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 shadow-xl section-container h-auto">
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-2xl sm:text-3xl music-heading mb-2 text-white">Top Artists</h3>
                                    <p className="text-base sm:text-lg music-text text-white">{topArtists.length} total artists</p>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {topArtists.map((artist, index) => (
                                        <div key={index} className="content-card">
                                            <ArtistCard 
                                                artist={artist} 
                                                index={index}
                                                apiKey={LASTFM_API_KEY}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 shadow-xl section-container h-auto">
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-2xl sm:text-3xl music-heading mb-2 text-white">Recently Played</h3>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {recentTracks.map((track, index) => (
                                        <div key={index} className="content-card">
                                            <div className="flex items-center space-x-3 sm:space-x-6 group hover:bg-white/5 p-3 sm:p-4 rounded-lg transition-all duration-300">
                                                <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg overflow-hidden relative bg-gray-800 flex-shrink-0">
                                                    <img 
                                                        src={track.image[3]['#text'] || `https://ui-avatars.com/api/?name=${encodeURIComponent(track.name)}&background=random`}
                                                        alt={track.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="text-base sm:text-xl music-heading text-white truncate">
                                                            {track.name}
                                                        </h4>
                                                        {track['@attr']?.nowplaying && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="relative flex h-2 sm:h-3 w-2 sm:w-3">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-green-500"></span>
                                                                </span>
                                                                <span className="text-xs sm:text-sm music-text text-green-400">
                                                                    Listening now
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm sm:text-base text-gray-400 music-text truncate">
                                                        {track.artist['#text']}
                                                    </p>
                                                </div>
                                                {!track['@attr']?.nowplaying && (
                                                    <div className="text-xs sm:text-sm text-gray-500 music-text hidden sm:block">
                                                        {new Date(track.date?.uts * 1000).toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Music;