

---
## content.js - 25/12/2025, 9:34:26 pm

### 🔹 Message Handling from Background Script

```javascript
// Content script that runs on all webpages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showSlangMeaning') {
    showMeaningPopup(request.slang, request.meaning);
  } else if (request.action === 'showError') {
    showErrorPopup(request.message);
  }
});
```

**Explanation:**
*   **Concept:** This code sets up a listener in the content script to receive messages from other parts of the Chrome extension, like the background script or popup.
*   **How it's working ?**
    *   `chrome.runtime.onMessage.addListener(...)`: This line registers a function that will be executed whenever a message is sent to this content script.
    *   `(request, sender, sendResponse) => { ... }`: This is the callback function that gets triggered on message receipt, containing the message data (`request`), sender info (`sender`), and a function to send a reply (`sendResponse`).
    *   `if (request.action === 'showSlangMeaning')`: It checks if the `action` property in the received message is `'showSlangMeaning'`.
    *   `showMeaningPopup(request.slang, request.meaning);`: If the action matches, it calls the `showMeaningPopup` function, passing the slang and its meaning from the message.
    *   `else if (request.action === 'showError')`: If the first condition isn't met, it checks if the `action` is `'showError'`.
    *   `showErrorPopup(request.message);`: If the action is `'showError'`, it calls the `showErrorPopup` function, passing the error message from the request.
*   **Key Syntax:** `chrome.runtime.onMessage.addListener`, `if/else if`

### 🔹 Creating the Slang Meaning Popup

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
```

**Explanation:**
*   **Concept:** This code defines a function to dynamically create an HTML `div` element that will serve as a popup displaying a slang word and its meaning.
*   **How it's working ?**
    *   `function showMeaningPopup(slang, meaning) { ... }`: This declares a function named `showMeaningPopup` that accepts two arguments: `slang` (the slang word) and `meaning` (its definition).
    *   `const popup = document.createElement('div');`: A new HTML `div` element is created in memory, which will become our popup container.
    *   `popup.id = 'slang-decoder-popup';`: An `id` of `'slang-decoder-popup'` is assigned to this new `div` for unique identification.
    *   `popup.className = 'slang-decoder-popup';`: A CSS class `'slang-decoder-popup'` is assigned to style the popup according to predefined rules.
    *   `popup.innerHTML = `...``: The inner HTML content of the popup `div` is set using a template literal, including a header with the slang (converted to uppercase), a close button, and the meaning of the slang.
*   **Key Syntax:** `function`, `document.createElement`, `innerHTML`, `toUpperCase`, `onclick`

### 🔹 Injecting Styles for the Meaning Popup

```javascript
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
        border: 2px solid #4CAF50;
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
```

**Explanation:**
*   **Concept:** This section ensures that the necessary CSS styles for the slang meaning popup are dynamically injected into the webpage's `<head>` only once.
*   **How it's working ?**
    *   `if (!document.getElementById('slang-decoder-styles')) { ... }`: This condition checks if a `<style>` tag with the ID `'slang-decoder-styles'` already exists in the document; if it doesn't, the styles are injected.
    *   `const styles = document.createElement('style');`: A new HTML `<style>` element is created to hold our CSS rules.
    *   `styles.id = 'slang-decoder-styles';`: An `id` is assigned to this `<style>` tag so that we can check for its existence in future calls and avoid duplicate injections.
    *   `styles.textContent = `...``: All the CSS rules for styling the popup, including its positioning, colors, borders, shadows, and animation, are defined and set as the text content of the `<style>` element.
    *   `document.head.appendChild(styles);`: The newly created `<style>` element, now containing all the CSS rules, is appended to the `<head>` section of the webpage, making the styles active on the page.
*   **Key Syntax:** `document.getElementById`, `document.createElement`, `textContent`, `document.head.appendChild`

### 🔹 Displaying and Auto-closing the Meaning Popup

```javascript
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
*   **Concept:** After creating the popup and injecting its styles, this code adds the popup to the visible page and sets a timer to automatically remove it after a few seconds.
*   **How it's working ?**
    *   `document.body.appendChild(popup);`: The `popup` element, which was created and populated with HTML, is now added as a child to the `<body>` of the current webpage, making it visible to the user.
    *   `setTimeout(() => { ... }, 5000);`: This function schedules another function to run once after a specified delay; here, the function will execute after 5000 milliseconds (5 seconds).
    *   `if (document.getElementById('slang-decoder-popup')) { ... }`: Inside the `setTimeout`'s callback, this check ensures that the popup still exists on the page before trying to remove it (it might have been closed manually by the user).
    *   `document.getElementById('slang-decoder-popup').remove();`: If the popup is still present after 5 seconds, this line removes the popup element from the document, effectively closing it automatically.
*   **Key Syntax:** `document.body.appendChild`, `setTimeout`, `remove`

### 🔹 Creating the Error Popup

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
```

**Explanation:**
*   **Concept:** This function is responsible for creating an HTML popup specifically designed to display error messages, such as when a slang word is not found.
*   **How it's working ?**
    *   `function showErrorPopup(message) { ... }`: This defines a function named `showErrorPopup` that takes one argument, `message`, which is the error text to be displayed.
    *   `const popup = document.createElement('div');`: A new `div` HTML element is created in memory to serve as the main container for the error popup.
    *   `popup.id = 'slang-decoder-error';`: A unique `id` of `'slang-decoder-error'` is assigned to this `div` for specific styling and referencing.
    *   `popup.className = 'slang-decoder-error';`: A CSS class `'slang-decoder-error'` is applied for error-specific visual styling.
    *   `popup.innerHTML = `...``: The inner HTML content of the error popup is set, including a "Not Found" header, a close button, and the actual error `message` passed to the function.
*   **Key Syntax:** `function`, `document.createElement`, `innerHTML`, `onclick`

### 🔹 Injecting Styles for the Error Popup

```javascript
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
        padding: 20px;
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
```

**Explanation:**
*   **Concept:** This code dynamically injects specific CSS styles for the error popup into the webpage's `<head>`, ensuring the styles are added only once.
*   **How it's working ?**
    *   `if (!document.getElementById('slang-decoder-error-styles')) { ... }`: This line checks if a `<style>` tag with the ID `'slang-decoder-error-styles'` already exists in the document; if it doesn't, the styles will be injected.
    *   `const styles = document.createElement('style');`: A new HTML `<style>` element is created to contain the CSS rules for the error popup.
    *   `styles.id = 'slang-decoder-error-styles';`: An `id` is given to this `<style>` tag to easily check for its presence later and prevent duplicate style injections.
    *   `styles.textContent = `...``: All the CSS rules specific to the error popup, such as its red border, positioning, and font styles, are defined as the text content of the `<style>` element.
    *   `document.head.appendChild(styles);`: The newly created `<style>` element, containing the error-specific CSS, is then appended to the `<head>` section of the webpage, applying these styles to the page.
*   **Key Syntax:** `document.getElementById`, `document.createElement`, `textContent`, `document.head.appendChild`

### 🔹 Displaying and Auto-closing the Error Popup

```javascript
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
*   **Concept:** This final part of the `showErrorPopup` function adds the constructed error popup to the webpage and sets up an automatic timer to remove it after a short delay.
*   **How it's working ?**
    *   `document.body.appendChild(popup);`: The `popup` element, which holds the error message and its structure, is added as a child to the `<body>` of the current webpage, making it visible to the user.
    *   `setTimeout(() => { ... }, 5000);`: This schedules a function to run after 5000 milliseconds (5 seconds), providing a temporary display for the error.
    *   `if (document.getElementById('slang-decoder-error')) { ... }`: Inside the `setTimeout` callback, this checks if the error popup still exists on the page (e.g., if the user hasn't manually closed it).
    *   `document.getElementById('slang-decoder-error').remove();`: If the error popup is still present after 5 seconds, this line removes the popup element from the document, effectively auto-closing it.
*   **Key Syntax:** `document.body.appendChild`, `setTimeout`, `remove`


---
## content.js - 25/12/2025, 9:34:50 pm

### 🔹 Setting up the Message Listener

```javascript
// Content script that runs on all webpages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showSlangMeaning') {
    showMeaningPopup(request.slang, request.meaning);
  } else if (request.action === 'showError') {
    showErrorPopup(request.message);
  }
});
```

**Explanation:**
*   **Concept:** This code sets up a listener in the content script to receive messages sent from other parts of the Chrome extension, such as the background script or popup.
*   **How it's working ?**
    *   `chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { ... });`: This line registers an event listener that waits for messages from the extension. When a message arrives, the provided function runs with `request` (message data), `sender` (who sent it), and `sendResponse` (to reply).
    *   `if (request.action === 'showSlangMeaning') { ... }`: It checks if the `action` specified in the incoming message is `'showSlangMeaning'`, indicating a request to display a slang definition.
    *   `showMeaningPopup(request.slang, request.meaning);`: If the action matches, this line calls the `showMeaningPopup` function, passing the slang word and its meaning extracted from the message.
    *   `else if (request.action === 'showError') { ... }`: If the action is instead `'showError'`, it means the message contains an error that needs to be shown to the user.
    *   `showErrorPopup(request.message);`: In case of an error action, this line calls the `showErrorPopup` function, providing the error message from the `request` object.
*   **Key Syntax:** `chrome.runtime.onMessage.addListener`, `if/else if` statements for conditional logic.

### 🔹 Displaying the Slang Meaning Popup

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
        border: 2px solid #4CAF50;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
      }

      .slang-decoder-content {
        padding: 20px;
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
*   **Concept:** This function is responsible for dynamically creating, styling, displaying, and automatically closing a popup window on the current webpage to show the meaning of a slang word.
*   **How it's working ?**
    *   `function showMeaningPopup(slang, meaning) { ... }`: This defines a function that takes two arguments: the `slang` word and its `meaning` to be displayed.
    *   `const popup = document.createElement('div');`: A new `div` HTML element is created in memory to serve as the main container for the popup.
    *   `popup.id = 'slang-decoder-popup'; popup.className = 'slang-decoder-popup';`: The `div` is given a unique ID and a CSS class, which are essential for targeting it with styles and for later removal.
    *   `popup.innerHTML = `...`;`: The internal HTML structure of the popup is set using a template literal, dynamically embedding the `slang` (uppercased) and its `meaning`. It also includes a close button with an inline `onclick` handler to remove the popup.
    *   `if (!document.getElementById('slang-decoder-styles')) { ... }`: This checks if the custom CSS styles for the popup have already been added to the document's `<head>`. This prevents the same styles from being injected multiple times.
    *   `const styles = document.createElement('style'); styles.id = 'slang-decoder-styles';`: If styles aren't present, a new `<style>` element is created and given a unique ID.
    *   `styles.textContent = `...`;`: All the CSS rules required for the popup's appearance (position, colors, animation, etc.) are defined here as text content for the `<style>` element.
    *   `document.head.appendChild(styles);`: The newly created `<style>` element containing all the CSS rules is then added to the `<head>` section of the webpage, making the styles active.
    *   `document.body.appendChild(popup);`: The fully constructed `popup` element, including its content, is added to the `<body>` of the current webpage, making it visible to the user.
    *   `setTimeout(() => { ... }, 5000);`: A timer is set here to automatically close the popup after 5000 milliseconds (5 seconds).
    *   `if (document.getElementById('slang-decoder-popup')) { document.getElementById('slang-decoder-popup').remove(); }`: Inside the `setTimeout` callback, it safely checks if the popup still exists on the page before attempting to remove it, preventing errors if the user closed it manually.
*   **Key Syntax:** `document.createElement`, `innerHTML`, `document.getElementById`, `document.head.appendChild`, `document.body.appendChild`, `setTimeout`, `remove()`, template literals (`` ` ``).

### 🔹 Displaying the Error Popup

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
        padding: 20px;
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
*   **Concept:** This function is very similar to `showMeaningPopup`, but it's specialized for displaying an error message to the user, typically with different styling (e.g., a red border) to indicate a problem.
*   **How it's working ?**
    *   `function showErrorPopup(message) { ... }`: This defines a function that accepts a single `message` argument, which will be the error text displayed in the popup.
    *   `const popup = document.createElement('div');`: A new `div` element is created to act as the container for the error popup.
    *   `popup.id = 'slang-decoder-error'; popup.className = 'slang-decoder-error';`: The error popup is given a distinct ID and CSS class for identification and styling purposes.
    *   `popup.innerHTML = `...`;`: The internal HTML content of the error popup is set, displaying a "Not Found" header and the provided error `message`. It also includes a close button with an inline `onclick` handler.
    *   `if (!document.getElementById('slang-decoder-error-styles')) { ... }`: This checks if the specific CSS styles for the error popup have already been injected into the document's `<head>`, preventing redundant style injections.
    *   `const styles = document.createElement('style'); styles.id = 'slang-decoder-error-styles';`: If the error styles are not present, a new `<style>` element is created and assigned a unique ID.
    *   `styles.textContent = `...`;`: The CSS rules for the error popup's appearance (e.g., a red border for an error) are defined here and set as the content of the `<style>` element.
    *   `document.head.appendChild(styles);`: The newly created `<style>` element containing the error-specific CSS is appended to the `<head>` of the webpage, making those styles active.
    *   `document.body.appendChild(popup);`: The fully constructed `popup` element for the error message is added to the `<body>` of the current webpage, making it visible.
    *   `setTimeout(() => { ... }, 5000);`: A timer is initiated to automatically remove the error popup from the page after 5 seconds.
    *   `if (document.getElementById('slang-decoder-error')) { document.getElementById('slang-decoder-error').remove(); }`: Inside the `setTimeout` callback, it checks if the error popup still exists before attempting to remove it, ensuring the operation is safe even if the user manually closed it earlier.
*   **Key Syntax:** `document.createElement`, `innerHTML`, `document.getElementById`, `document.head.appendChild`, `document.body.appendChild`, `setTimeout`, `remove()`, template literals (`` ` ``).


---
## content.js - 25/12/2025, 9:40:32 pm

### 🔹 Adding Popup to Page and Auto-closing After 5 Seconds

```javascript
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
*   **Concept:** This code segment finishes injecting the main popup's CSS styles into the document's head, then adds the complete popup element to the webpage, and finally sets a timer for it to automatically close itself after a 5-second delay.
*   **How it's working ?**
    *   `transform: translate(-50%, -50%);`: This CSS rule is the last part of the style string, crucial for visually centering the popup on the screen using CSS transforms.
    *   `document.head.appendChild(styles);`: This line takes the `styles` element (which contains all the CSS rules for the popup) and adds it to the `<head>` section of the HTML document, making the styles active.
    *   `} `: This closing brace marks the end of the `if` condition that checks if the styles have already been added, ensuring they are only injected once.
    *   `// Add popup to page`: This is a helpful comment indicating the next step, which is to make the popup visible.
    *   `document.body.appendChild(popup);`: This command adds the entire `popup` HTML element, which was constructed earlier, directly into the `<body>` of the current webpage, displaying it to the user.
    *   `// Auto-close after 5 seconds`: This comment tells us that the popup won't stay forever and will disappear on its own.
    *   `setTimeout(() => { ... }, 5000);`: This function schedules a specific piece of code to run after a delay of 5000 milliseconds (which is 5 seconds).
    *   `if (document.getElementById('slang-decoder-popup')) { ... }`: Inside the `setTimeout` callback, this checks if the popup element with the ID `slang-decoder-popup` is still present in the document.
    *   `document.getElementById('slang-decoder-popup').remove();`: If the popup is still there, this line removes the popup element completely from the HTML, effectively closing it.
    *   `} `: This final closing brace indicates the end of the `showPopup` function's definition.
*   **Key Syntax:** `document.head.appendChild()`, `document.body.appendChild()`, `setTimeout()`, `if`, `.remove()`.

---

### 🔹 Creating and Managing an Error Popup

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
*   **Concept:** This `showErrorPopup` function generates a temporary error message popup on the screen, complete with distinct error styling, a custom message, and an auto-close feature after a short duration.
*   **How it's working ?**
    *   `function showErrorPopup(message) {`: This defines a new function that takes a `message` string as an argument, which will be shown as the error text.
    *   `// Create error popup`: This comment signals the beginning of the popup's creation process.
    *   `const popup = document.createElement('div');`: A new `<div>` HTML element is created in memory to serve as the container for the error popup.
    *   `popup.id = 'slang-decoder-error';`: An ID of `slang-decoder-error` is assigned to this `div`, allowing it to be uniquely identified in the HTML.
    *   `popup.className = 'slang-decoder-error';`: A CSS class `slang-decoder-error` is added to the `div` for applying specific error-related visual styles.
    *   `popup.innerHTML = `...``: This sets the entire internal HTML structure of the popup, including a header, a "Not Found" title, a close button, and a paragraph displaying the `message`.
    *   `<button ... onclick="document.getElementById('slang-decoder-error').remove()">✕</button>`: This HTML button has an `onclick` event that immediately removes the error popup from the page when clicked.
    *   `<p>${message}</p>`: This line uses template literals to embed the `message` passed to the function directly into the popup's body.
    *   `// Inject error styles if not already present`: This comment explains that the next section will add the CSS for the error popup, but only if it hasn't been added before.
    *   `if (!document.getElementById('slang-decoder-error-styles')) {`: This condition checks if a `<style>` tag with the ID `slang-decoder-error-styles` already exists in the document's `<head>`.
    *   `const styles = document.createElement('style');`: If the styles are not found, a new `<style>` HTML element is created.
    *   `styles.id = 'slang-decoder-error-styles';`: This assigns a unique ID to the new style tag, so it can be tracked and avoided from being added multiple times.
    *   `styles.textContent = `...``: All the CSS rules specific to the error popup, defining its appearance (like position, color, border, etc.), are put into this `textContent` property.
    *   `.slang-decoder-error { ... }`: This CSS block centers the error popup on the screen (`top: 50%; left: 50%; transform: translate(-50%, -50%);`), gives it a white background, a prominent red border (`border: 2px solid #f44336;`), and a shadow.
    *   `document.head.appendChild(styles);`: The newly created style element, containing all the error CSS, is appended to the `<head>` of the HTML document, making the styles apply.
    *   `// Add popup to page`: This comment indicates that the popup is about to be displayed.
    *   `document.body.appendChild(popup);`: The constructed `popup` element is added to the `<body>` of the webpage, making it visible to the user.
    *   `// Auto-close after 5 seconds`: This comment explains that the error popup will automatically disappear after a brief period.
    *   `setTimeout(() => { ... }, 5000);`: This function is used to execute a block of code after a delay of 5000 milliseconds (5 seconds).
    *   `if (document.getElementById('slang-decoder-error')) { ... }`: Inside the `setTimeout` function, this checks if the error popup element is still present on the page.
    *   `document.getElementById('slang-decoder-error').remove();`: If the error popup is found, this line removes it from the document, causing it to disappear.
    *   `} `: This final closing brace concludes the `showErrorPopup` function definition.
*   **Key Syntax:** `function`, `const`, `document.createElement()`, `popup.id`, `popup.className`, `popup.innerHTML`, `onclick`, `if`, `document.head.appendChild()`, `document.body.appendChild()`, `setTimeout()`, `.remove()`.
