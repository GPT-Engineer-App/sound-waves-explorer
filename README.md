# sound-waves-explorer

Sound Waves Simulation

The sound waves simulation allows elementary grade students to explore and visualize how sound energy travels through a material. Sounds are represented as longitudinal (compression) waves, traveling through particles.

The simulation should have air particles, a sound source, as well as the user interface overlaid on top of the sound source. The sound source is a full height 300px width grey rectangle on the far left. There are 10,000 air particles (50% opacity black circles) initialized in random positions around the canvas. 

Overlaid on top is the interface, positioned left on the far left, with a wavelength slider, an amplitude slider, and a play/pause button.

Pressing play causes the sound the user set up (with amplitude and wavelength sliders) to vibrate the sound source causing the width of the sound source to expand and contract, which causes the sound to travel through the air particles by compressing and expanding the air particle positions to match the waveform traveling from the sound source on the left toward the right.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/sound-waves-explorer.git
cd sound-waves-explorer
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
