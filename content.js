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

// Listen for messages from background script (right-click context menu)
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
