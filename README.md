# AudTTS

**AudTTS** is a premium, lightweight Next.js web application designed to generate ultra-realistic AI voiceovers. Powered by the **ElevenLabs Multilingual v2** model, it is specifically tuned to highlight voices commonly used in SaaS product launches and professional tutorial videos.

## ✨ Features

- **Neural Voice Synthesis:** Generates high-fidelity, lifelike speech using the ElevenLabs API.
- **Curated Professional Voices:** Automatically fetches available voices and highlights recommended options (e.g., Bella, Matilda) that are proven to perform best in SaaS walkthroughs and online education.
- **Bespoke UI Design:** 
  - Crafted with a custom "Obsidian & Electric Indigo" vanilla CSS design system.
  - Flat, solid-color styling approach for maximum contrast and professional clarity.
  - Embedded character-count tracking and sleek dropdown configurations.
- **Integrated Playback & Export:** Listen to the generated audio directly in the browser or download the `.mp3` file instantly.

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org) (App Router)
- **Frontend Toolkit:** React 19, Custom Vanilla CSS
- **API/AI:** [ElevenLabs](https://elevenlabs.io) API Server-Side Integration
- **Package Manager:** `pnpm` / `npm`

## 🚀 Getting Started

### Prerequisites
You will need a valid **ElevenLabs API Key** to run this application.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/AudTTS.git
   cd AudTTS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your ElevenLabs API Key:
   ```env
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎙️ Usage Guide

1. Type or paste your instructional script into the **Input Text** area.
2. Select your desired voice from the **Voice Selector**. *We highly recommend selecting the starred voices (⭐) for SaaS or tutorial videos.*
3. Click **Generate Speech**.
4. Use the custom audio player to review the clip, and click **Download** to save it locally.

## 📄 License
This project is licensed under the MIT License.
