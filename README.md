# GAYDAR 3000 🌈

The most scientifically inaccurate machine ever built. Built with Next.js 14/15/16 App Router, TypeScript, and powered by Gemini 3.5 Flash.

This is a fun, unhinged quiz application that takes users through 10 highly specific, hilarious social scenarios, calculates their "gay score", and feeds it to Google's Gemini 3.5 Flash model to dynamically generate 3 absurdity-filled "scientific" reasons explaining their exact score.

---

## Features

- **10 Scenario-Based Questions**: Awkward, hilarious, sweat-inducing social dilemmas where *every* option is at least a little bit gay (no 0-point options!).
- **Dynamic AI Explanations**: Uses Gemini 3.5 Flash to generate unhinged pseudoscientific analysis referencing the user's actual choices.
- **Sleek Cyberpunk/Rainbow UI**: Built with custom HSL-tailored gradient styling, floating glowing orbs, a progress bar (stretching from 10% to 100%), and smooth staggered entry animations.
- **Local Artworks Integration**: Displays custom meme artwork on the results screen right below the score.

---

## Getting Started

### Prerequisites
- Node.js (v18.x or later recommended)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/) (Free tier works perfectly)

### Local Setup

1. **Clone/download this repository** and navigate to the project directory:
   ```bash
   cd gaydar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file at the root of the project:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: `.env.local` is listed in `.gitignore` and will never be committed to Git.)*

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser to test it.

---

## Hosting on Vercel

To host this project on Vercel and connect the Gemini API, follow these steps:

### 1. Push to GitHub
Create a repository on GitHub (either public or private) and push your codebase:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```
*(Your `.env.local` and `.next` folder will be skipped automatically thanks to the `.gitignore` setup).*

### 2. Import to Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
2. Select your `gaydar` GitHub repository and click **Import**.

### 3. Add the Gemini API Key (Environment Variables)
Before clicking **Deploy**, scroll down to the **Environment Variables** section on the import screen:
1. Under **Key**, enter: `GEMINI_API_KEY`
2. Under **Value**, paste your Gemini API Key (starts with `AIzaSy...`).
3. Click **Add**.

*Alternatively, if the project is already deployed, go to **Settings > Environment Variables** on your Vercel project page, add `GEMINI_API_KEY` there, and redeploy.*

### 4. Deploy!
Click **Deploy**. Vercel will build your static pages and serverless API endpoints. Within a minute, your application will be live at a custom `.vercel.app` URL!

---

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (embedded dynamic stylesheets for high customization)
- **AI Integration**: `@google/generative-ai` SDK using `gemini-3.5-flash`

---

## License
Fun project created for entertainment purposes. 🏳️‍🌈
