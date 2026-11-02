# Saarthi — Architecture

## Data flow
1. User opens the extension popup and speaks or selects an explanation action.
2. Speech recognition (where supported) produces text.
3. Popup sends a predefined message to the content script.
4. Content script scans visible DOM controls and obtains their labels.
5. The response is displayed and spoken using speech synthesis.
6. For a matching status/search control, the extension highlights it and asks for confirmation before clicking.

## Components
- Popup UI: interaction controls and accessible status text.
- Content script: webpage inspection, highlighting, and limited interaction.
- Demo page: local university application-status flow.
- Browser speech services: voice recognition and speech output.

## Safety boundaries
- No arbitrary AI-generated JavaScript is executed.
- The prototype is scoped to localhost demo pages.
- A confirmation panel appears before the demo button is activated.
- Do not enter real personal or payment information.

## Limitations
Speech recognition support depends on browser and device. The current prototype uses keyword matching rather than a deployed LLM. Page structures differ, so selectors and labels may not be detected on every site.
