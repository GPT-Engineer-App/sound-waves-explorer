import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, VStack, Text } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

const PARTICLE_COUNT = 10000;
const SOUND_SOURCE_WIDTH = 300;

const Index = () => {
  const [wavelength, setWavelength] = useState(50);
  const [amplitude, setAmplitude] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedParticle, setSelectedParticle] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      particles.forEach((particle, index) => {
        const distance = Math.sqrt((x - particle.x) ** 2 + (y - particle.y) ** 2);
        if (distance < 12) {
          setSelectedParticle(index);
        }
      });
    };

    canvas.addEventListener("click", handleClick);

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
      particles.forEach((particle, index) => {
        if (isPlaying) {
          const distance = particle.x - SOUND_SOURCE_WIDTH;
          const waveOffset = Math.sin(distance / wavelength + Date.now() / 100) * amplitude;
          particle.x += waveOffset * 0.1;
        }
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
        ctx.fill();

        if (selectedParticle === index) {
          ctx.strokeStyle = "red";
          ctx.lineWidth = 10;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [wavelength, amplitude, isPlaying, selectedParticle]);

  return (
    <Box>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />
      <VStack spacing={4} p={4} alignItems="flex-start">
        <Text color="white">Wavelength: {wavelength}</Text>
        <Slider value={wavelength} min={10} max={100} onChange={(value) => setWavelength(value)} width="250px">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text color="white">Amplitude: {amplitude}</Text>
        <Slider value={amplitude} min={10} max={50} onChange={(value) => setAmplitude(value)} width="250px">
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
