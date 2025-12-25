

---
## content.js - 25/12/2025, 9:45:30 pm

### 🔹 Slang Dictionary

```javascript
// Slang dictionary
const slangDictionary = {
  'nvm': 'Never Mind',
  'lol': 'Laugh Out Loud',
  'oomf': 'One of My Friends',
  'brb': 'Be Right Back',
  'idk': 'I Don\'t Know',
  'smh': 'Shaking My Head',
  'btw': 'By The Way',
  'omg': 'Oh My God',
  'fyi': 'For Your Information',
  'asap': 'As Soon As Possible',
  'ttyl': 'Talk To You Later',
  'bff': 'Best Friends Forever',
  'jk': 'Just Kidding',
  'imho': 'In My Humble Opinion',
  'lmao': 'Laughing My Ass Off',
  'rofl': 'Rolling On Floor Laughing',
  'wtf': 'What The Fuck',
  'fml': 'Fuck My Life',
  'sry': 'Sorry',
  'thx': 'Thanks',
  'pls': 'Please',
  'u': 'You',
  'ur': 'Your/You\'re',
  'b4': 'Before',
  'gr8': 'Great',
  'l8r': 'Later',
  'asl': 'Age, Sex, Location',
  'dw': 'Don\'t Worry',
  'np': 'No Problem',
  'imo': 'In My Opinion',
  'afaik': 'As Far As I Know',
  'idc': 'I Don\'t Care',
  'nah': 'No',
  'yep': 'Yes',
  'yup': 'Yes',
  'k': 'Okay',
  'okurrr': 'Okay (extended)',
  'sos': 'Someone Over Shoulder',
  'ama': 'Ask Me Anything',
  'tl;dr': 'Too Long; Didn\'t Read',
  'ew': 'Eww/Disgusting',
  'gj': 'Good Job',
  'hbu': 'How About You',
  'hmm': 'Thinking',
  'msg': 'Message',
  'rn': 'Right Now',
  'rly': 'Really',
  'ty': 'Thank You',
  'yw': 'You\'re Welcome',
  'bae': 'Before Anyone Else/Baby',
  'lit': 'Exciting/Cool',
  'fire': 'Awesome/Cool',
  'sus': 'Suspicious',
  'salty': 'Bitter/Upset',
  'savage': 'Awesome/Bold',
  'beast': 'Powerful/Skilled',
  'noob': 'Newbie',
  'pwn': 'Own/Dominate',
  'fail': 'Failure',
  'epic': 'Awesome',
  'sick': 'Cool/Awesome',
  'dope': 'Cool/Excellent',
  'tight': 'Cool',
  'cringe': 'Embarrassing',
  'vibe': 'Feeling/Mood',
  'slay': 'Doing Great/Impressive',
  'lowkey': 'Secretly/Somewhat',
  'highkey': 'Obviously/Very',
  'flex': 'Show Off',
  'simp': 'Someone Who Does Too Much For Another',
  'bussin': 'Really Good',
  'slaps': 'Is Really Good',
  'hits': 'Is Really Good',
  'drip': 'Style/Fashion',
  'vibe check': 'Assess Someone\'s Mood/Personality'
};
```

**Explanation:**
*   **Concept:** This code defines a `slangDictionary` object, which stores common internet slang terms as keys and their full meanings as values. It's essentially a lookup table for slang.
*   **How it's working ?**
    *   `const slangDictionary = { ... };`: This declares a constant variable named `slangDictionary` and initializes it as a JavaScript object.
    *   `'nvm': 'Never Mind',`: Each line inside the object is a key-value pair, where the slang term (e.g., `'nvm'`) is the key, and its expanded meaning (e.g., `'Never Mind'`) is the value.
*   **Key Syntax:** `const`, `{ }` (Object literal).

### 🔹 Keyboard Shortcut Listener (Ctrl+M)

```javascript
// Listen for keyboard shortcut (Ctrl+M) to show meaning
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'm') {
    e.preventDefault();
    const selectedText = window.getSelection().toString().trim().toLowerCase();
    
    if (selectedText) {
      const meaning = slangDictionary[selectedText];
      
      if (meaning) {
        showMeaningPopup(selectedText, meaning);
      } else {
        showErrorPopup(`"${selectedText}" not found in Slang Decoder database.`);
      }
    }
  }
});
```

**Explanation:**
*   **Concept:** This block sets up an event listener that detects when a user presses a key. If `Ctrl+M` is pressed, it tries to find the meaning of the currently selected text using the `slangDictionary`.
*   **How it's working ?**
    *   `document.addEventListener('keydown', (e) => { ... });`: This attaches an event listener to the entire document, which will execute the provided function every time a key is pressed down. `e` is the event object.
    *   `if (e.ctrlKey && e.key === 'm') { ... }`: This checks if the Control key (`ctrlKey`) is pressed simultaneously with the 'm' key.
    *   `e.preventDefault();`: This stops the browser's default action for the `Ctrl+M` shortcut (which might be opening a bookmark manager).
    *   `const selectedText = window.getSelection().toString().trim().toLowerCase();`: This gets the text currently highlighted by the user, converts it to a string, removes any leading/trailing whitespace, and makes it all lowercase for consistent lookup.
    *   `if (selectedText) { ... }`: This checks if any text was actually selected.
    *   `const meaning = slangDictionary[selectedText];`: It tries to find the meaning of the `selectedText` in our `slangDictionary`. If found, `meaning` will be the definition; otherwise, it will be `undefined`.
    *   `if (meaning) { showMeaningPopup(selectedText, meaning); }`: If a meaning is found, it calls the `showMeaningPopup` function to display it.
    *   `else { showErrorPopup(...) }`: If no meaning is found, it calls `showErrorPopup` to inform the user that the slang wasn't in the database.
*   **Key Syntax:** `addEventListener`, `e.ctrlKey`, `e.key`, `e.preventDefault()`, `window.getSelection()`, `toString()`, `trim()`, `toLowerCase()`.

### 🔹 Extension Message Listener

```javascript
// Listen for messages from background script (right-click context menu)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showSlangMeaning') {
    showMeaningPopup(request.slang, request.meaning);
  } else if (request.action === 'showError') {
    showErrorPopup(request.message);
  }
});
```

**Explanation:**
*   **Concept:** This code sets up a listener to receive messages specifically from other parts of the Chrome extension, like a background script. This is how the content script knows when a user has used the right-click context menu to look up slang.
*   **How it's working ?**
    *   `chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { ... });`: This is a Chrome API method that allows content scripts to listen for messages sent by the extension's background script or popup. `request` contains the message data, `sender` info about the sender, and `sendResponse` is a function to send a reply back.
    *   `if (request.action === 'showSlangMeaning') { ... }`: If the received message has an `action` property equal to `'showSlangMeaning'`, it means the user wants to see a slang's definition.
    *   `showMeaningPopup(request.slang, request.meaning);`: It then calls `showMeaningPopup` with the slang term and its meaning provided in the message.
    *   `else if (request.action === 'showError') { ... }`: If the message's `action` is `'showError'`, it means the background script wants to display an error.
    *   `showErrorPopup(request.message);`: It calls `showErrorPopup` with the error `message` from the request.
*   **Key Syntax:** `chrome.runtime.onMessage.addListener`, `request.action`, `request.slang`, `request.meaning`, `request.message`.

### 🔹 Show Meaning Popup Function

```javascript
function showMeaningPopup(slang, meaning) {
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'slang-decoder-popup';
  popup.className = 'slang-decoder-popup';
  popup.innerHTML = `
    <div class="slang-decoder-content">
      <div class="slang-decoder-header">
        <h3>${slang.toUpperCase()}</h3>
        <button class="slang-decoder-close" onclick="document.getElementById('slang-decoder-popup').remove()">✕</button>
      </div>
      <div class="slang-decoder-body">
        <p><strong>Meaning:</strong></p>
        <p>${meaning}</p>
      </div>
    </div>
  `;

  // Inject styles if not already present
  if (!document.getElementById('slang-decoder-styles')) {
    const styles = document.createElement('style');
    styles.id = 'slang-decoder-styles';
    styles.textContent = `
      .slang-decoder-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999;
        background: white;
        border: 2px solid #26872aff;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
      }

      .slang-decoder-content {
        padding: 20px 40px;
        font-family: Arial, sans-serif;
      }

      .slang-decoder-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 10px;
      }

      .slang-decoder-header h3 {
        margin: 0;
        color: #4CAF50;
        font-size: 20px;
      }

      .slang-decoder-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .slang-decoder-close:hover {
        color: #333;
      }

      .slang-decoder-body {
        color: #333;
        font-size: 14px;
        line-height: 1.6;
      }

      .slang-decoder-body p {
        margin: 5px 0;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -45%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Add popup to page
  document.body.appendChild(popup);

  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.getElementById('slang-decoder-popup')) {
      document.getElementById('slang-decoder-popup').remove();
    }
  }, 5000);
}
```

**Explanation:**
*   **Concept:** This function creates, styles, displays, and then automatically removes a popup window that shows the meaning of a slang term on the current web page.
*   **How it's working ?**
    *   `function showMeaningPopup(slang, meaning) { ... }`: Defines a function that takes two arguments: the `slang` term and its `meaning`.
    *   `const popup = document.createElement('div');`: Creates a new `div` HTML element that will serve as the container for our popup.
    *   `popup.id = 'slang-decoder-popup'; popup.className = 'slang-decoder-popup';`: Assigns an ID and a class to the new `div` for easy identification and styling.
    *   `popup.innerHTML = `...`;`: Sets the inner HTML of the popup `div` using a template literal. It dynamically inserts the `slang` (converted to uppercase) and its `meaning`. It also includes a close button with an `onclick` event to remove the popup.
    *   `if (!document.getElementById('slang-decoder-styles')) { ... }`: This checks if the styling for the popup has already been added to the document's `<head>`. This prevents duplicate style injections.
    *   `const styles = document.createElement('style');`: If styles aren't present, a new `<style>` element is created.
    *   `styles.id = 'slang-decoder-styles'; styles.textContent = `...`;`: The style element is given an ID and its `textContent` is set to the CSS rules for the popup's appearance and animation.
    *   `document.head.appendChild(styles);`: The newly created `<style>` element is appended to the `<head>` section of the HTML document, making the styles active.
    *   `document.body.appendChild(popup);`: The `popup` `div` is appended to the `<body>` of the HTML document, making it visible on the page.
    *   `setTimeout(() => { ... }, 5000);`: This sets a timer to execute a function after 5000 milliseconds (5 seconds).
    *   `if (document.getElementById('slang-decoder-popup')) { document.getElementById('slang-decoder-popup').remove(); }`: After 5 seconds, this checks if the popup still exists on the page and, if it does, removes it.
*   **Key Syntax:** `function`, `document.createElement()`, `id`, `className`, `innerHTML`, `document.getElementById()`, `appendChild()`, `setTimeout()`, `remove()`, template literals (` `` `), `onclick`.

### 🔹 Show Error Popup Function

```javascript
function showErrorPopup(message) {
  // Create error popup
  const popup = document.createElement('div');
  popup.id = 'slang-decoder-error';
  popup.className = 'slang-decoder-error';
  popup.innerHTML = `
    <div class="slang-decoder-error-content">
      <div class="slang-decoder-error-header">
        <h3>Not Found</h3>
        <button class="slang-decoder-close" onclick="document.getElementById('slang-decoder-error').remove()">✕</button>
      </div>
      <div class="slang-decoder-error-body">
        <p>${message}</p>
      </div>
    </div>
  `;

  // Inject error styles if not already present
  if (!document.getElementById('slang-decoder-error-styles')) {
    const styles = document.createElement('style');
    styles.id = 'slang-decoder-error-styles';
    styles.textContent = `
      .slang-decoder-error {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999;
        background: white;
        border: 2px solid #f44336;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
      }

      .slang-decoder-error-content {
        padding: 20px 40px;
        font-family: Arial, sans-serif;
      }

      .slang-decoder-error-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 10px;
      }

      .slang-decoder-error-header h3 {
        margin: 0;
        color: #f44336;
        font-size: 20px;
      }

      .slang-decoder-error-body {
        color: #333;
        font-size: 14px;
        line-height: 1.6;
      }

      .slang-decoder-error-body p {
        margin: 5px 0;
      }
    `;
    document.head.appendChild(styles);
  }

  // Add popup to page
  document.body.appendChild(popup);

  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.getElementById('slang-decoder-error')) {
      document.getElementById('slang-decoder-error').remove();
    }
  }, 5000);
}
```

**Explanation:**
*   **Concept:** This function is very similar to `showMeaningPopup`, but it's specifically designed to display an error message in a popup. It has distinct styling (red border) to indicate an error.
*   **How it's working ?**
    *   `function showErrorPopup(message) { ... }`: Defines a function that takes an `message` string as an argument, which will be the error text.
    *   `const popup = document.createElement('div');`: Creates a new `div` element for the error popup.
    *   `popup.id = 'slang-decoder-error'; popup.className = 'slang-decoder-error';`: Sets a unique ID and class for the error popup.
    *   `popup.innerHTML = `...`;`: Populates the popup with HTML, including a "Not Found" header, the `message`, and a close button.
    *   `if (!document.getElementById('slang-decoder-error-styles')) { ... }`: Checks if the specific error styles have already been injected to avoid duplicates.
    *   `const styles = document.createElement('style');`: If not present, creates a new `<style>` element.
    *   `styles.id = 'slang-decoder-error-styles'; styles.textContent = `...`;`: Assigns an ID and the CSS rules for the error popup, notably using a red border (`#f44336`).
    *   `document.head.appendChild(styles);`: Injects these error-specific styles into the document's `<head>`.
    *   `document.body.appendChild(popup);`: Adds the error popup `div` to the `<body>`, making it visible.
    *   `setTimeout(() => { ... }, 5000);`: Sets a timer to automatically remove the error popup after 5 seconds.
    *   `if (document.getElementById('slang-decoder-error')) { document.getElementById('slang-decoder-error').remove(); }`: Checks if the error popup still exists and removes it when the timer expires.
*   **Key Syntax:** `function`, `document.createElement()`, `id`, `className`, `innerHTML`, `document.getElementById()`, `appendChild()`, `setTimeout()`, `remove()`, template literals (` `` `), `onclick`.


---
## background.js - 25/12/2025, 10:05:07 pm

### 🔹 Slang Dictionary Definition

```javascript
// Slang dictionary
const slangDictionary = {
  // Common internet slang
  'nvm': 'Never Mind',
  'lol': 'Laugh Out Loud',
  'oomf': 'One of My Friends',
  'brb': 'Be Right Back',
  'idk': 'I Don\'t Know',
  'smh': 'Shaking My Head',
  'btw': 'By The Way',
  'omg': 'Oh My God',
  'fyi': 'For Your Information',
  'asap': 'As Soon As Possible',
  'ttyl': 'Talk To You Later',
  'bff': 'Best Friends Forever',
  'jk': 'Just Kidding',
  'imho': 'In My Humble Opinion',
  'lmao': 'Laughing My Ass Off',
  'rofl': 'Rolling On Floor Laughing',
  'wtf': 'What The Fuck',
  'fml': 'Fuck My Life',
  'sry': 'Sorry',
  'thx': 'Thanks',
  'pls': 'Please',
  'u': 'You',
  'ur': 'Your/You\'re',
  'b4': 'Before',
  'gr8': 'Great',
  'l8r': 'Later',
  'asl': 'Age, Sex, Location',
  'dw': 'Don\'t Worry',
  'np': 'No Problem',
  'imo': 'In My Opinion',
  'afaik': 'As Far As I Know',
  'idc': 'I Don\'t Care',
  'nah': 'No',
  'yep': 'Yes',
  'yup': 'Yes',
  'k': 'Okay',
  'okurrr': 'Okay (extended)',
  'sos': 'Someone Over Shoulder',
  'ama': 'Ask Me Anything',
  'tl;dr': 'Too Long; Didn\'t Read',
  'ew': 'Eww/Disgusting',
  'gj': 'Good Job',
  'hbu': 'How About You',
  'hmm': 'Thinking',
  'msg': 'Message',
  'rn': 'Right Now',
  'rly': 'Really',
  'ty': 'Thank You',
  'yw': 'You\'re Welcome',
  'bae': 'Before Anyone Else/Baby',
  'lit': 'Exciting/Cool',
  'fire': 'Awesome/Cool',
  'sus': 'Suspicious',
  'salty': 'Bitter/Upset',
  'savage': 'Awesome/Bold',
  'beast': 'Powerful/Skilled',
  'noob': 'Newbie',
  'pwn': 'Own/Dominate',
  'fail': 'Failure',
  'epic': 'Awesome',
  'sick': 'Cool/Awesome',
  'dope': 'Cool/Excellent',
  'tight': 'Cool',
  'cringe': 'Embarrassing',
  'vibe': 'Feeling/Mood',
  'slay': 'Doing Great/Impressive',
  'lowkey': 'Secretly/Somewhat',
  'highkey': 'Obviously/Very',
  'flex': 'Show Off',
  'simp': 'Someone Who Does Too Much For Another',
  'salty': 'Upset/Bitter',
  'mad': 'Angry/Very',
  'lit': 'Exciting/Cool',
  'bussin': 'Really Good',
  'slaps': 'Is Really Good',
  'hits': 'Is Really Good',
  'drip': 'Style/Fashion',
  'vibe check': 'Assess Someone\'s Mood/Personality'
};
```

**Explanation:**
*   **Concept:** This code defines a JavaScript object that acts like a dictionary, storing common internet slang terms as keys and their full meanings as values. It's essentially a lookup table for slang.
*   **How it's working ?**
    *   `const slangDictionary = { ... };`: This declares a constant variable named `slangDictionary` and assigns it a JavaScript object.
    *   `'nvm': 'Never Mind',`: Each line inside the object defines a "key" (the slang term like 'nvm') and its corresponding "value" (the meaning like 'Never Mind').
    *   `'vibe check': 'Assess Someone\'s Mood/Personality'`: This is the last entry in the dictionary, providing the slang 'vibe check' and its detailed meaning.
*   **Key Syntax:** `const`, `Object Literals`, `key-value pairs`.

### 🔹 Creating Context Menu Item

```javascript
// Create context menu
chrome.contextMenus.create({
  id: 'showSlangMeaning',
  title: 'Show Meaning',
  contexts: ['selection']
});
```

**Explanation:**
*   **Concept:** This code creates a new option that appears when you right-click on selected text in your web browser, allowing you to quickly look up its meaning.
*   **How it's working ?**
    *   `chrome.contextMenus.create({ ... });`: This is a Chrome API function that adds a new item to the browser's context menu (the menu that pops up when you right-click).
    *   `id: 'showSlangMeaning',`: This assigns a unique identifier `'showSlangMeaning'` to this specific menu item, which helps in referencing it later.
    *   `title: 'Show Meaning',`: This sets the text that users will see in the right-click menu, making it clear what the option does.
    *   `contexts: ['selection']`: This specifies that this menu item should only appear in the context menu when the user has selected some text on a webpage.
*   **Key Syntax:** `chrome.contextMenus.create`, `Object Literals`, `Array Literals`.

### 🔹 Handling Context Menu Click Event

```javascript
// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'showSlangMeaning') {
    const selectedText = info.selectionText.trim().toLowerCase();
    const meaning = slangDictionary[selectedText];

    if (meaning) {
      // Send message to content script to show the meaning
      chrome.tabs.sendMessage(tab.id, {
        action: 'showSlangMeaning',
        slang: selectedText,
        meaning: meaning
      }).catch((error) => {
        console.log('Content script not available on this page');
      });
    } else {
      // Slang not found
      chrome.tabs.sendMessage(tab.id, {
        action: 'showError',
        message: `"${selectedText}" not found in Slang Decoder database.`
      }).catch((error) => {
        console.log('Content script not available on this page');
      });
    }
  }
});
```

**Explanation:**
*   **Concept:** This code listens for clicks on the custom "Show Meaning" option in the right-click menu. When clicked, it takes the selected text, finds its meaning from the dictionary, and then sends that meaning to the webpage to be displayed.
*   **How it's working ?**
    *   `chrome.contextMenus.onClicked.addListener((info, tab) => { ... });`: This attaches an event listener that runs a function whenever any context menu item is clicked, providing details (`info`) about the click and the active browser tab.
    *   `if (info.menuItemId === 'showSlangMeaning') { ... }`: This checks if the clicked menu item is specifically the "Show Meaning" option we created earlier using its unique ID.
    *   `const selectedText = info.selectionText.trim().toLowerCase();`: It grabs the text the user highlighted, removes any extra spaces around it, and converts it to lowercase for consistent lookup in the dictionary.
    *   `const meaning = slangDictionary[selectedText];`: It attempts to find the full meaning of the `selectedText` by looking it up as a key in the `slangDictionary`.
    *   `if (meaning) { ... }`: If a matching meaning is found in the dictionary for the selected slang, the code inside this block will execute.
    *   `chrome.tabs.sendMessage(tab.id, { ... }).catch((error) => { ... });`: This sends a message to the content script running on the current webpage, instructing it to display the found `meaning` for the `slang`. If the content script isn't active on that page, it logs an error.
    *   `else { ... }`: If the `selectedText` is not found as a key in the `slangDictionary`, the code inside this block will run.
    *   `chrome.tabs.sendMessage(tab.id, { ... }).catch((error) => { ... });`: This sends a message to the content script, telling it to display an `showError` message indicating that the selected slang could not be found in its database.
*   **Key Syntax:** `chrome.contextMenus.onClicked.addListener`, `if/else` statements, `const`, `String methods (.trim(), .toLowerCase())`, `chrome.tabs.sendMessage`, `Promise.prototype.catch`.
