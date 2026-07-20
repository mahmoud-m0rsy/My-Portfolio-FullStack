const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const projects = [
  {
    id: 1,
    title: "AHMED_PORTFOLIO",
    category: "web",
    skills: ["html", "css", "js"],
    description: "A fully responsive personal portfolio website built for my brother Ahmed showcasing his work and skills.",
    link: "https://github.com/flashrider429-cpu/morsitoo-portfolio"
  },
  {
    id: 2,
    title: "TO_DO_LIST",
    category: "web",
    skills: ["js", "react"],
    description: "A dynamic task management application features interactive UI and state management.",
    link: "https://github.com/flashrider429-cpu/todo-list-app"
  },
  {
    id: 3,
    title: "CYBERPUNK_QUIZ",
    category: "web",
    skills: ["html", "css", "js", "tailwind", "database"],
    description: "An advanced, interactive terminal-style quiz system powered by a live database backend setup.",
    link: "https://github.com/flashrider429-cpu/cyberpunk-quiz"
  },
  {
    id: 4,
    title: "PULSE_API",
    category: "web",
    skills: ["go", "js"],
    description: "High-throughput REST API in Go serving telemetry from IoT devices with sub-10ms p99 latency.",
    link: "#"
  },
  {
    id: 5,
    title: "AURORA_CMS",
    category: "web",
    skills: ["html", "js", "react"],
    description: "A headless CMS with a markdown-first editor, role-based access, and a clean admin panel.",
    link: "#"
  },
  {
    id: 6,
    title: "PHANTOM_SCANNER",
    category: "security",
    skills: ["python", "linux"],
    description: "Network reconnaissance tool that maps exposed services and flags misconfigured hosts.",
    link: "#"
  },
  {
    id: 7,
    title: "ZERO_DAY_FUZZER",
    category: "security",
    skills: ["python"],
    description: "A targeted input-fuzzing harness for binary parses, built around coverage-guided mutation.",
    link: "#"
  },
  {
    id: 8,
    title: "ROOTKIT_HUNTER",
    category: "security",
    skills: ["linux", "python"],
    description: "Linux kernel integrity monitor that surfaces hidden processes, modules, and persistence hooks.",
    link: "#"
  },
  {
    id: 9,
    title: "CIPHER_AUDIT",
    category: "security",
    skills: ["go", "linux"],
    description: "Static analyzer for Go services that detects common crypto misuse and unsafe deserialization patterns.",
    link: "#"
  },
  {
    id: 10,
    title: "SPECTER_VPN",
    category: "security",
    skills: ["go", "linux"],
    description: "A minimal WireGuard-based mesh VPN prototype with hardware-key authentication.",
    link: "#"
  }
];

// GET: Projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// POST: Contact Form -> Telegram
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const telegramToken = process.env.TELEGRAM_TOKEN || "8610109784:AAEy0VSw83nZjBUwqoOrb1MG0gRxv8JftDc";
  const chatId = process.env.CHAT_ID || "8915174122";

  const text = `📬 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const telegramData = await response.json();
    res.json({ success: true, message: "Message transmitted successfully" });
  } catch (error) {
    console.error("Telegram API Error:", error);
    res.status(500).json({ error: "Failed to send message to Telegram" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});