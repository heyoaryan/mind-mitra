import React, { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = ({ density = 50, type = 'default' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: getRandomColor(),
          pulse: Math.random() * 0.02 + 0.01,
          angle: Math.random() * Math.PI * 2,
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        'rgba(102, 126, 234, ',
        'rgba(240, 147, 251, ',
        'rgba(79, 172, 254, ',
        'rgba(118, 75, 162, ',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.angle += 0.01;

        // Pulse effect
        particle.opacity += particle.pulse;
        if (particle.opacity > 0.8 || particle.opacity < 0.1) {
          particle.pulse *= -1;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color + particle.opacity + ')');
        gradient.addColorStop(1, particle.color + '0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add sparkle effect
        if (Math.random() < 0.01) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + '0.8)';
          ctx.fill();
        }

        // Draw connections between nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const connectionOpacity = (1 - distance / 120) * 0.3;
            const connectionGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            connectionGradient.addColorStop(0, particle.color + connectionOpacity + ')');
            connectionGradient.addColorStop(1, otherParticle.color + connectionOpacity + ')');

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = connectionGradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [density]);

  // Create floating HTML particles for additional effect
  const createFloatingParticles = () => {
    const particles = [];
    for (let i = 0; i < Math.floor(density / 3); i++) {
      particles.push(
        <div
          key={i}
          className={`particle ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      );
    }
    return particles;
  };

  const createGeometricShapes = () => {
    const shapes = [];
    const shapeTypes = ['triangle', 'square', 'circle', 'hexagon'];
    
    for (let i = 0; i < 8; i++) {
      shapes.push(
        <div
          key={i}
          className={`geometric-shape ${shapeTypes[Math.floor(Math.random() * shapeTypes.length)]}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${20 + Math.random() * 10}s`
          }}
        />
      );
    }
    return shapes;
  };

  const createFloatingOrbs = () => {
    const orbs = [];
    for (let i = 0; i < 3; i++) {
      orbs.push(
        <div
          key={i}
          className="orb"
          style={{
            animationDelay: `${i * 5}s`
          }}
        />
      );
    }
    return orbs;
  };

  return (
    <>
      <canvas ref={canvasRef} className="particle-background" />
      <div className="floating-particles">
        {createFloatingParticles()}
      </div>
      <div className="geometric-bg">
        {createGeometricShapes()}
      </div>
      <div className="floating-orbs">
        {createFloatingOrbs()}
      </div>
    </>
  );
};

export default ParticleBackground;