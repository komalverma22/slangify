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

// Create context menu
chrome.contextMenus.create({
  id: 'showSlangMeaning',
  title: 'Show Meaning',
  contexts: ['selection']
});

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
      });
    } else {
      // Slang not found
      chrome.tabs.sendMessage(tab.id, {
        action: 'showError',
        message: `"${selectedText}" not found in Slang Decoder database.`
      });
    }
  }
});
