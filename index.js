const express = require('express');
const { chromium } = require('playwright');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Playwright API running 🚀");
});

app.get('/check-connection-status', async (req, res) => {
  res.json({ is_first_connection: true });
});

app.get('/get-profile-context', async (req, res) => {
  res.json({ job_title: "Développeur", company: "Mon Entreprise" });
});

app.post('/send-connection-request', async (req, res) => {
  res.json({ success: true });
});

app.post('/send-linkedin-message', async (req, res) => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');

    const title = await page.title();

    await browser.close();

    res.json({ success: true, pageTitle: title });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Playwright API listening on port ${PORT}`);
});
