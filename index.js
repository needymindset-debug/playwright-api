const express = require('express');
const { chromium } = require('playwright');

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Playwright API running 🚀"));

// Exemple : récupérer le contexte du profil
app.get('/get-profile-context', (req, res) => {
  res.json({ job_title: "Développeur", company: "Mon Entreprise" });
});

// Envoyer message LinkedIn
app.post('/send-linkedin-message', async (req, res) => {
  const { profileUrl, message } = req.body;
  if (!profileUrl || !message) return res.status(400).json({ error: "profileUrl et message requis" });

  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1️⃣ Se connecter à LinkedIn
    await page.goto('https://www.linkedin.com/login');
    await page.fill('#username', process.env.LINKEDIN_USER);
    await page.fill('#password', process.env.LINKEDIN_PASS);
    await page.click('button[type=submit]');
    await page.waitForNavigation();

    // 2️⃣ Aller sur le profil
    await page.goto(profileUrl);
    await page.click('text=Message');
    await page.fill('div[role=textbox]', message);
    await page.click('button[type=submit]');

    await browser.close();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Playwright API listening on port ${PORT}`));

// Test du navigateur Playwright

app.get('/test-browser', async (req, res) => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();
    res.json({ title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



