const express = require('express');
const { chromium } = require('playwright');

const app = express();
app.use(express.json());

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
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Playwright API listening on port ${PORT}`);
});
