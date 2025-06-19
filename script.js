const messagesEl = document.getElementById('messages');
const input      = document.getElementById('userInput');
const keyButton  = document.getElementById('keyButton');
const enterText  = document.getElementById('enterText');

let stage = 0;

/* ---------- Typewriter helpers ---------- */
function typeWriter(text, className = '') {
  return new Promise(resolve => {
    const span = document.createElement('span');
    if (className) span.className = className;
    messagesEl.appendChild(span);

    let i = 0;
    const typeInterval = setInterval(() => {
      span.textContent = text.slice(0, ++i);
      if (i === text.length) {
        clearInterval(typeInterval);
        messagesEl.appendChild(document.createElement('br'));
        messagesEl.scrollTop = messagesEl.scrollHeight;
        resolve();
      }
    }, 35);
  });
}

async function clerkSay(text) {
  await typeWriter('Clerk: ', 'nameClerk');
  await typeWriter(text);
}

async function youSay(text) {
  await typeWriter('You: ', 'nameYou');
  await typeWriter(text);
}

/* ---------- Scripted Conversation ---------- */
async function start() {
  await clerkSay("You've been summoned. Please state your clearance code.");
}
start();

input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const userText = input.value.trim();
    input.value = '';
    await youSay(userText);

    stage++;
    if (stage === 1) {
      await clerkSay("A code? Codes shift in the corridors like shadows. State it again, if you dare.");
    } else if (stage === 2) {
      await clerkSay("Curious... It appears in order, yet is out of order. One last attempt—prove you belong.");
    } else if (stage === 3) {
      await clerkSay("Very well. The threshold acknowledges you—take the key, if you can hold it.");
      activateKey();
    }
  }
});

/* ---------- Key Activation ---------- */
function activateKey() {
  keyButton.classList.add('active');
  enterText.classList.add('active');
  keyButton.style.cursor = 'pointer';

  keyButton.addEventListener('click', () => {
    // Placeholder navigation – replace with your actual game URL/page.
    alert('Entering the Castle... (replace this with your actual navigation)');
  });
}
