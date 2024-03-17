import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

const PARTICLE_COUNT = 10000;
const SOUND_SOURCE_WIDTH = 300;

const Index = () => {
  const [wavelength, setWavelength] = useState(50);
  const [amplitude, setAmplitude] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sound source
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, SOUND_SOURCE_WIDTH + (isPlaying ? Math.sin(Date.now() / 100) * amplitude : 0), canvas.height);

      // Draw particles
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      particles.forEach((particle) => {
        if (isPlaying) {
          const distance = particle.x - SOUND_SOURCE_WIDTH;
          const waveOffset = Math.sin(distance / wavelength + Date.now() / 100) * amplitude;
          particle.x += waveOffset * 0.1;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
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
        <Text>Wavelength: {wavelength}</Text>
        <Slider value={wavelength} min={10} max={100} onChange={(value) => setWavelength(value)} width="350px">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>Amplitude: {amplitude}</Text>
        <Slider value={amplitude} min={10} max={50} onChange={(value) => setAmplitude(value)} width="350px">
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
