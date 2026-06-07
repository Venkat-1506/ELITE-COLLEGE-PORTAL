// ============================================
// AI ASSISTANT - Complete Redesign with Better Styling
// Version 3.0 - Fixed styling and functionality
// ============================================

// Comprehensive Knowledge Base
const knowledgeBase = {
  // General Info
  'college name': 'ELITE Institute of Engineering — Established in 1978, NAAC A++ accredited with 3.82/4 CGPA. One of Chennai\'s premier engineering institutions.',
  'established': 'ELITE was founded in 1978 by Dr. S. Raghunathan, a visionary with a Ph.D. from IIT Madras. We are celebrating 47 years of excellence in 2025.',
  'location': 'Mambakkam – Medavakkam Main Road, Ponmar, Chennai, Tamil Nadu 600127. We are located about 25 km from Chennai International Airport.',
  'counselling code': 'Our TNEA counselling code is 1442. Please use this code during Tamil Nadu engineering admissions.',
  'about': 'ELITE Institute of Engineering is a NAAC A++ accredited institution established in 1978. We offer 9 UG programs, 6 PG programs, and PhD programs across engineering and management disciplines.',
  
  // Admissions
  'admission': 'Admissions for 2026 are open! Last date: July 31, 2026. Apply online through our website. Application fee: ₹1000.',
  'last date': 'Last date to apply is July 31, 2026. Counselling starts August 10, 2026. Orientation: September 1, 2026. Classes commence: September 15, 2026.',
  'eligibility': 'B.E/B.Tech: 55% aggregate in 10+2 with Physics, Chemistry, and Mathematics. MBA: Any bachelor\'s degree with 50% + valid TANCET/CAT/MAT score.',
  'application form': 'You can apply online through the Admissions page. Steps: 1) Fill basic details, 2) Upload documents, 3) Pay application fee ₹1000, 4) Submit and download acknowledgement.',
  'cutoff': 'TNEA cutoff for CSE: 185-190 marks, AI & DS: 180-185, ECE: 175-180, IT: 170-175, EEE: 165-170, Civil: 155-160, Biotech: 150-155.',
  
  // Courses
  'courses': 'We offer 9 undergraduate programs: B.E Computer Science & Engineering, B.E CSE (Cyber Security), B.Tech AI & Data Science, B.E Information Technology, B.E Electronics & Communication, B.E Electrical & Electronics, B.E Civil Engineering, B.Tech Biotechnology, and MBA.',
  'cse': 'B.E Computer Science & Engineering: 4 years, ₹1.35L/year, 120 seats. 95% placement, avg ₹12.5 LPA, highest ₹52 LPA.',
  'ai': 'B.Tech Artificial Intelligence & Data Science: 4 years, ₹1.45L/year, 110 seats. 97% placement, avg ₹14.2 LPA.',
  'cyber security': 'B.E CSE (Cyber Security): 4 years, ₹1.35L/year, 120 seats. 94% placement.',
  'ece': 'B.E Electronics & Communication: 4 years, ₹1.32L/year, 100 seats. 93% placement.',
  'mba': 'MBA Finance & Marketing: 2 years, ₹2.40L/year, 80 seats. 94% placement, avg ₹15.5 LPA.',
  
  // Fees
  'fee': 'Annual fees range from ₹1.20L to ₹2.40L depending on the course. Hostel fees: ₹80,000-1,20,000 per year including mess.',
  'fees structure': 'CSE/IT: ₹1.35L/year, AI/DS: ₹1.45L/year, Cyber Security: ₹1.35L/year, ECE: ₹1.32L/year, EEE: ₹1.30L/year, Civil: ₹1.20L/year, Biotech: ₹1.25L/year, MBA: ₹2.40L/year.',
  'hostel fee': 'Hostel fees: AC rooms: ₹1,20,000/year, Non-AC rooms: ₹80,000/year. Includes mess, Wi-Fi, gym.',
  
  // Scholarships
  'scholarship': 'Merit scholarship: 90%+ → 50% waiver, 95%+ → 75% waiver, 98%+ → 100% waiver. Sports scholarship: 25-75% for state/national/international players.',
  'scholarships': 'We offer 5 types: Merit (up to 100%), Sports (25-75%), First Graduate (₹25,000), Defence (10%), Girl Child (10%).',
  
  // Placements
  'placement': '94% placement rate. Highest package ₹52 LPA (Microsoft). Average ₹11.5 LPA. 500+ recruiters.',
  'placements': 'Top recruiters: Microsoft (₹52 LPA), Amazon (₹48 LPA), Google (₹45 LPA), Apple (₹44 LPA), Deloitte (₹18 LPA).',
  'highest package': 'Highest package: ₹52 LPA by Microsoft.',
  'average package': 'Average package: ₹11.5 LPA across all branches.',
  
  // Facilities
  'library': 'Central Library: 2.5L+ books, 500+ journals, 24/7 access during exams.',
  'hostel': 'Separate hostels for boys and girls. AC/Non-AC rooms, Wi-Fi, gym, 24/7 security.',
  'sports': 'Sports Complex: Cricket ground, football field, basketball courts, tennis courts, indoor games, gymnasium.',
  'lab': '45+ specialized labs including AI/ML, Robotics, IoT, VLSI, Cybersecurity labs.',
  
  // Contact
  'contact': 'Admissions: +91 90470 40413, Placement: +91 90470 40414, Email: admissions@elite.edu',
  'phone': 'Admissions Helpline: +91 90470 40413 (9 AM - 6 PM)',
  'email': 'Admissions: admissions@elite.edu, Placement: placement@elite.edu',
  'address': 'Mambakkam – Medavakkam Main Road, Ponmar, Chennai - 600127',
  'whatsapp': 'WhatsApp: +91 90470 40413',
  
  // Leadership
  'chairman': 'Dr. S. Raghunathan, Chairman & Founder. Ph.D. (IIT Madras), 45+ years experience.',
  'principal': 'Dr. G. Prabhakar, Principal. Ph.D. (Anna University), 30+ years experience.',
  
  // Rankings
  'ranking': 'NIRF Rank #42 among Engineering Colleges in India. NAAC A++ with 3.82/4 CGPA.',
  'accreditation': 'NAAC A++ accreditation, NBA accreditation for all UG programs, ISO 9001:2015 certified.',
  
  // Events
  'events': 'Cultural Fest "IMPULSE" (March), Tech Fest "YUGAM" (April), Sports Meet "SPANDAN" (February), Convocation (September).',
  'cultural fest': 'IMPULSE: 3-day cultural festival in March with celebrity performances, DJ nights, fashion show.',
  'tech fest': 'YUGAM: 3-day technical festival in April with robotics competition, hackathon, coding contests.'
};

// Suggested Questions
const suggestedQuestions = [
  "What courses are available?",
  "What is the fee structure?",
  "Tell me about placements",
  "How to apply for admission?",
  "What scholarships are available?",
  "Tell me about campus facilities",
  "Contact details for admission"
];

let conversationHistory = [];
let aiPopupOpen = false;

// Get AI Response
function getAIResponse(question) {
  const q = question.toLowerCase().trim();
  
  conversationHistory.push({ role: "user", content: q });
  if (conversationHistory.length > 10) conversationHistory.shift();
  
  // Greetings
  if (q.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)$/)) {
    return "Hello! 👋 Welcome to ELITE Institute. I'm your AI assistant. How can I help you today? You can ask me about admissions, courses, fees, placements, scholarships, or campus facilities!";
  }
  
  // Thanks
  if (q.includes('thank')) {
    return "You're very welcome! 🤗 Is there anything else I can help you with?";
  }
  
  // Help
  if (q.includes('help') || q.includes('what can you do')) {
    return getHelpMessage();
  }
  
  // Schedule visit
  if (q.includes('schedule') && (q.includes('visit') || q.includes('campus'))) {
    return "📅 To schedule a campus visit, please click the 'Schedule Campus Visit' button on our website or call +91 90470 40413.";
  }
  
  // Brochure
  if (q.includes('brochure') || q.includes('prospectus')) {
    return "📄 You can download our prospectus by clicking the 'Download Brochure' button on any page.";
  }
  
  // Check knowledge base
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (q.includes(key)) {
      return response;
    }
  }
  
  return getDefaultResponse();
}

function getHelpMessage() {
  return `🤖 **I can help you with:** 

📌 **Admissions** - Eligibility, process, deadlines
💰 **Fees & Scholarships** - Fee structure, scholarships
🎓 **Courses** - CSE, AI/DS, Cyber Security, ECE, MBA
💼 **Placements** - Placement rate, packages, recruiters
🏫 **Facilities** - Library, hostels, labs, sports
📞 **Contact** - Phone numbers, email, address

Just type your question! ✨`;
}

function getDefaultResponse() {
  return `🤔 I couldn't find specific information about that. 

Here are some things you can ask me:
${suggestedQuestions.map(q => `• ${q}`).join('\n')}

Or contact our admission office at +91 90470 40413 for immediate assistance.`;
}

// AI Assistant UI Functions
function toggleAIPopup() {
  const popup = document.getElementById('aiPopup');
  if (popup) {
    popup.classList.toggle('open');
    aiPopupOpen = popup.classList.contains('open');
    if (aiPopupOpen) {
      const input = document.getElementById('aiInput');
      if (input) input.focus();
      addSuggestedQuestions();
    }
  }
}

function closeAIPopup() {
  const popup = document.getElementById('aiPopup');
  if (popup) {
    popup.classList.remove('open');
    aiPopupOpen = false;
  }
}

function addSuggestedQuestions() {
  const messagesDiv = document.getElementById('aiMessages');
  if (!messagesDiv) return;
  
  if (document.querySelector('.ai-suggestions')) return;
  
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.className = 'ai-suggestions';
  
  suggestedQuestions.slice(0, 4).forEach(q => {
    const btn = document.createElement('button');
    btn.textContent = q;
    btn.className = 'ai-suggestion-btn';
    btn.onclick = () => {
      const input = document.getElementById('aiInput');
      if (input) {
        input.value = q;
        sendAIMessage();
      }
    };
    suggestionsDiv.appendChild(btn);
  });
  
  messagesDiv.appendChild(suggestionsDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addAIMessage(text, isUser) {
  const messagesDiv = document.getElementById('aiMessages');
  if (!messagesDiv) return;
  
  const div = document.createElement('div');
  div.className = `ai-message ${isUser ? 'ai-message-user' : 'ai-message-bot'}`;
  
  const avatar = isUser ? 
    '<div class="ai-avatar user-avatar"><i class="fas fa-user"></i></div>' : 
    '<div class="ai-avatar bot-avatar"><i class="fas fa-robot"></i></div>';
  
  let formattedText = text;
  if (!isUser) {
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/•/g, '<br>•');
    formattedText = formattedText.replace(/\n/g, '<br>');
  }
  
  div.innerHTML = `${avatar}<div class="ai-message-content">${formattedText}</div>`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendAIMessage() {
  const input = document.getElementById('aiInput');
  if (!input) return;
  
  const userMsg = input.value.trim();
  if (!userMsg) return;
  
  addAIMessage(userMsg, true);
  input.value = '';
  
  // Show typing indicator
  const messagesDiv = document.getElementById('aiMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message ai-message-bot typing-indicator';
  typingDiv.innerHTML = '<div class="ai-avatar bot-avatar"><i class="fas fa-robot"></i></div><div class="ai-message-content"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>';
  messagesDiv.appendChild(typingDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  
  setTimeout(() => {
    typingDiv.remove();
    const reply = getAIResponse(userMsg);
    addAIMessage(reply, false);
  }, 600);
}

function handleAIKeyPress(e) {
  if (e.key === 'Enter') {
    sendAIMessage();
  }
}

function clearConversation() {
  conversationHistory = [];
  const messagesDiv = document.getElementById('aiMessages');
  if (messagesDiv) {
    messagesDiv.innerHTML = `<div class="ai-message ai-message-bot">
      <div class="ai-avatar bot-avatar"><i class="fas fa-robot"></i></div>
      <div class="ai-message-content">Hello! 👋 Welcome to ELITE Institute. I'm your AI assistant. Ask me anything about admissions, courses, fees, placements, scholarships, or campus facilities!</div>
    </div>`;
    addSuggestedQuestions();
  }
}

// Initialize AI Assistant
document.addEventListener('DOMContentLoaded', () => {
  const aiFab = document.getElementById('aiFab');
  const closeAi = document.getElementById('closeAiPopup');
  const sendBtn = document.getElementById('aiSendBtn');
  const aiInput = document.getElementById('aiInput');
  
  if (aiFab) aiFab.addEventListener('click', toggleAIPopup);
  if (closeAi) closeAi.addEventListener('click', closeAIPopup);
  if (sendBtn) sendBtn.addEventListener('click', sendAIMessage);
  if (aiInput) aiInput.addEventListener('keypress', handleAIKeyPress);
  
  // Add clear conversation button
  const aiHeader = document.querySelector('.ai-header');
  if (aiHeader && !document.getElementById('clearChatBtn')) {
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clearChatBtn';
    clearBtn.className = 'ai-clear-btn';
    clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    clearBtn.title = 'Clear conversation';
    clearBtn.onclick = (e) => {
      e.stopPropagation();
      clearConversation();
    };
    aiHeader.appendChild(clearBtn);
  }
});