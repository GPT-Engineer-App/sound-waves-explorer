import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

const PARTICLE_COUNT = 8000;
const SOUND_SOURCE_WIDTH = 300;

const Index = () => {
  const [wavelength, setWavelength] = useState(50);
  const [amplitude, setAmplitude] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        initialPosition: { x, y },
        direction: Math.random() * Math.PI * 2,
        distance: 0,
        maxDistance: Math.random() * 50 + 50,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sound source
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, SOUND_SOURCE_WIDTH + (isPlaying ? Math.sin(Date.now() / 100) * amplitude : 0), canvas.height);

      // Draw particles
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      particles.forEach((particle) => {
        if (isPlaying) {
          particle.distance += 1;
          if (particle.distance > particle.maxDistance) {
            particle.distance = 0;
          }
          const distanceRatio = particle.distance / particle.maxDistance;
          particle.x = particle.initialPosition.x + Math.cos(particle.direction) * distanceRatio * particle.maxDistance;
          particle.y = particle.initialPosition.y + Math.sin(particle.direction) * distanceRatio * particle.maxDistance;

          const waveDistance = particle.x - SOUND_SOURCE_WIDTH;
          const waveOffset = Math.sin(waveDistance / wavelength - Date.now() / 100) * amplitude;
          particle.x -= waveOffset * 0.5;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [wavelength, amplitude, isPlaying]);

  return (
    <Box>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />
      <VStack spacing={4} p={4} alignItems="flex-start">
        <Text color="white">Wavelength: {wavelength}</Text>
        <Slider value={wavelength} min={1} max={100} onChange={(value) => setWavelength(value)} width="250px">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text color="white">Amplitude: {amplitude}</Text>
        <Slider value={amplitude} min={1} max={100} onChange={(value) => setAmplitude(value)} width="250px">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button leftIcon={isPlaying ? <FaPause /> : <FaPlay />} onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
