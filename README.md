# 🎁 Giftify AI

[![Lovers Week Special](https://img.shields.io/badge/February-Lovers%20Week%20Edition-FF6B6B?style=for-the-badge&logo=heartshare&logoColor=white)](https://github.com/Sardar-Sadiq/Gift-Suggestor)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20GSAP-FFD93D?style=for-the-badge)](https://github.com/Sardar-Sadiq/Gift-Suggestor)

**Giftify AI** is a personalized, logic-driven gift suggestor designed to eliminate decision fatigue with style. Built with a vibrant "Cartoon Neubrutalist" aesthetic, it leverages a sophisticated internal matching engine to recommend perfect presents for any recipient.

---

## ✨ Features

### 🧠 Rule-Based AI Matching Engine
The app uses **Rule-Based AI logic** (found in `src/utils/suggestionEngine.js`) to process user data and generate the most personalized gift matches from its curated internal database. This approach ensures high speed and reliability without needing an expensive external API key.

No more outdated static lists! The engine curates suggestions in real-time based on:
- **Recipient Personality** (Techie, Gamer, Artist, Romantic)
- **Occasion Context** (Lovers Week, Birthdays, Anniversaries)
- **Vibe Tracking** (Practical vs. Quirky)
- **Budget Logic** (Economical to Premium)

### 🎨 Premium Cartoon UI (Neubrutalism)
- **High-Contrast Design**: Bold black outlines and vibrant "Pop" colors.
- **GSAP Transitions**: Fluid, bouncy page transitions that feel like a high-end cartoon.
- **Responsive Layout**: Optimized for both mobile "quick-matches" and desktop browsing.

### 🛒 Smart Shopping Integration
- **100% Link Reliability**: Uses automated Search-Redirects for Amazon India and Flipkart.
- **Real-Time Price Checks**: Simulated AI price comparison across multiple platforms.
- **Smart Fallbacks**: Integrated error handling for product imagery to ensure a beautiful experience, always.

### 💖 Lovers Week Special (Feb 7-14)
Deeply integrated tracks for Rose Day, Propose Day, Teddy Day, and the big Valentine's finale.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Animations**: [GSAP (GreenSock)](https://greensock.com/) & [Lucide React](https://lucide.dev/)
- **Styling**: Custom CSS3 (Neubrutalist Design System)
- **Data Architecture**: Rule-Based Scoring & JSON Processing

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sardar-Sadiq/Gift-Suggestor.git
   ```

2. Navigate to the directory:
   ```bash
   cd Gift-Suggestor
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📸 Preview Logic

The app dynamically matches gender and interests:
- **For Boys**: High-performance Hot Wheels collector packs, RC gadgets, and retro gaming tech.
- **For Girls**: Professional art markers, Instax cameras, and aesthetic DIY journaling kits.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new "Vibe" categories or better matching logic, feel free to open a PR.

**Made with 💖 by [Sadiq](https://github.com/Sardar-Sadiq)**
