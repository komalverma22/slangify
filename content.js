// Content script that runs on all webpages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showSlangMeaning') {
    showMeaningPopup(request.slang, request.meaning);
  } else if (request.action === 'showError') {
    showErrorPopup(request.message);
  }
});

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
