import React, { useEffect, useState } from 'react';
import Circle from './Circle';
import NeonGradient from './NeonGradient';

const SemiCircularRipple = ({ hoveredCircle, setHoveredCircle }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const circleContents = [
    {
      title: 'About Me',
      content: "I’m Dev Mondal, a tech enthusiast passionate about web development, cloud computing, and DevOps. I primarily work with JavaScript, Python, and TypeScript, focusing on building scalable and efficient applications. Currently, I’m exploring AWS, Docker, Kubernetes, and serverless technologies"
    },
    {
      title: 'Tech Stack',
      content: 'As a student, I have experience working with JavaScript and Python for building web applications. I use React.js for frontend development and Node.js, Express.js, and Flask for the backend. For databases, I mainly work with MongoDB. I’m also learning about cloud computing and DevOps, exploring AWS (EC2, S3, Lambda, DynamoDB), Docker, and Kubernetes. I use Git and GitHub for version control and enjoy experimenting with new technologies to improve my skills.'
    },
    {
      title: 'Certifications',
      content: (
        <div className="flex flex-wrap gap-2">
          {[
            'Python Essential-1 by Cisco',
            'Introduction to Cyber-Security',
            'ML Algorithms',
            'Introduction to AI',
            'ML applications'
          ].map((cert, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-black bg-opacity-50 rounded-full border border-white/20 text-sm hover:bg-opacity-70 transition-all duration-300"
            >
              {cert}
            </span>
          ))}
        </div>
      )
    },
    {
      title: 'Languages',
      content: (
        <div className="flex flex-wrap gap-2">
          {[
            'React',
            'Node.js',
            'Docker',
            'Kubernetes',
            'Python'
          ].map((lang, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-black bg-opacity-50 rounded-full border border-white/20 text-sm hover:bg-opacity-70 transition-all duration-300"
            >
              {lang}
            </span>
          ))}
        </div>
      )
    }
  ];

  const circles = Array.from({ length: 4 }, (_, i) => {
    const baseSize = Math.min(dimensions.width, dimensions.height) * 0.9;
    const size = baseSize - (i * (baseSize / 12));
    
    const x = (dimensions.width - size) / 2;
    const y = (dimensions.height - size) / 2;

    return {
      size,
      delay: i * 100,
      color: `rgba(0, 0, 0, ${1 - i * 0.2})`,
      position: { x, y },
      ...circleContents[i]
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      <NeonGradient hoveredCircle={hoveredCircle} />
      <div className="relative w-full h-full">
        {circles.map((circle, index) => (
          <Circle
            key={index}
            size={circle.size}
            delay={circle.delay}
            color={circle.color}
            position={circle.position}
            title=""
            content=""
            onHover={() => setHoveredCircle(index)}
            onLeave={() => setHoveredCircle(null)}
          />
        ))}
      </div>
      <div className={`absolute inset-0 flex items-center justify-center z-30 pointer-events-none transition-opacity duration-300 ${hoveredCircle !== null ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl text-white text-center p-8">
          {hoveredCircle !== null && (
            <div>
              <h2 className="text-4xl font-bold mb-4">{circles[hoveredCircle].title}</h2>
              <p className="text-xl">{circles[hoveredCircle].content}</p>
            </div>
          )}
        </div>
      </div>
      <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300 ${hoveredCircle === null ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-2xl text-white text-center p-8">
          <h2 className="text-4xl font-bold mb-4">More about me!</h2>
          <p className="text-xl">Hover over the circles to explore my journey!</p>
        </div>
      </div>
      </div>
    
  );
};

export default SemiCircularRipple;