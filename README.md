# Saarthi — Voice-Guided Web Assistant

Saarthi is a hackathon prototype designed to help people with limited digital literacy understand and navigate webpages using voice-guided assistance.

## Current prototype
- Reads visible interactive elements on the current page.
- Speaks a short explanation using browser text-to-speech.
- Accepts a small set of voice commands where supported.
- Highlights likely status/search buttons.
- Shows a confirmation before activating a matching button.
- Includes a mock university application-status portal.

> This is a proof of concept. Voice recognition availability varies by browser/device. The current version uses rule-based command handling; an LLM-powered understanding layer is proposed future work.

## Run the demo
1. Start a local server from the project root: `python3 -m http.server 8000`
2. Open `http://localhost:8000/demo/university.html` in Chrome.
3. Visit `chrome://extensions`.
4. Turn on **Developer mode**.
5. Select **Load unpacked** and choose the `extension` folder.
6. Open the Saarthi extension on the demo page and try **Explain this page** or **Tap to speak**.

## Git and GitHub
```bash
git init
git add .
git commit -m "Initial Saarthi prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Saarthi.git
git push -u origin main
```
Create the repository on GitHub first and replace `YOUR_USERNAME`.

## Project layout
- `extension/`: Chrome extension source
- `demo/`: local demo website
- `docs/`: abstract and architecture notes

## Privacy and safety
The demo does not transmit webpage content to a remote AI service. Confirm before important actions. Do not use this prototype for real payments, submissions, or sensitive accounts.

## Future scope
Add an LLM-based intent engine, Hindi and other Indian languages, accessibility-tree support, broader page compatibility, and user-controlled action policies.
