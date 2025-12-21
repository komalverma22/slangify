# Slang Decoder Chrome Extension

A simple Chrome extension that helps you decode internet slang and short forms with a right-click context menu.

## Features

✨ **Easy to Use**: Simply select any slang word on a webpage and right-click to see its meaning
🎯 **Comprehensive Dictionary**: Includes 50+ common slang terms and acronyms
⚡ **Fast & Lightweight**: Minimal performance impact on your browsing
🎨 **Beautiful UI**: Clean popup design with auto-close functionality

## Supported Slang Terms

- **Common Acronyms**: nvm, lol, oomf, brb, idk, smh, btw, omg, fyi, asap, ttyl, bff, jk, imho, lmao, rofl, wtf, fml
- **Text Speak**: sry, thx, pls, u, ur, b4, gr8, l8r, k
- **Modern Slang**: bae, lit, fire, sus, salty, savage, beast, noob, pwn, fail, epic, sick, dope, tight, cringe, vibe, slay, lowkey, highkey, flex, simp, bussin, slaps, hits, drip
- **And many more!**

## How to Use

1. **Select** any slang word on a webpage
2. **Right-click** to open the context menu
3. **Click** "Show Meaning" to see the definition
4. The popup will automatically close after 5 seconds or when you click the ✕ button

## Installation

### Manual Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the `slang-decoder` folder
6. The extension should now appear in your extensions list

### Using the Extension

Once installed, you'll see the extension icon in your Chrome toolbar. You can now:
- Select any slang term on any webpage
- Right-click to see the context menu
- Click "Show Meaning" to reveal the definition

## File Structure

```
slang-decoder/
├── manifest.json       # Extension configuration
├── background.js       # Background service worker
├── content.js          # Content script (runs on web pages)
└── README.md           # This file
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension format)
- **Permissions Used**: contextMenus (for right-click menu)
- **Scripts**:
  - `background.js`: Handles context menu creation and messaging
  - `content.js`: Displays popups on webpages

## How It Works

1. When you right-click on a selection, the background script checks if it's in the slang dictionary
2. If found, it sends a message to the content script to display the meaning
3. The content script shows a styled popup with the slang term and its definition
4. The popup auto-closes after 5 seconds or can be manually closed

## Future Enhancements

- Add more slang terms to the dictionary
- Support for different languages
- Options page to customize popup appearance
- Search functionality within the extension

## License

This project is open source and available under the MIT License.

## Support

If you find any bugs or want to suggest new slang terms, feel free to contribute!
