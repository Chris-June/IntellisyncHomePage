const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const generateEmailTemplate = require('./email-template');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use an app-specific password
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, selectedAddOns, selectedTier } = req.body;

  // Generate both HTML and plain text versions
  const htmlContent = generateEmailTemplate({ name, email, phone, message, selectedAddOns, selectedTier });
  const textContent = `
New Website Inquiry

Plan Selected: ${selectedTier.name} ($${selectedTier.price}/month)

Contact Information:
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Selected Add-ons:
----------------
${selectedAddOns.join('\n')}

Additional Information:
---------------------
${message || 'No additional information provided'}
`;

  const mailOptions = {
    from: {
      name: 'Intellisync Website',
      address: process.env.EMAIL_USER
    },
    to: 'chris.june@intellisync.ca',
    subject: `New Website Inquiry - ${selectedTier.name} Plan`,
    text: textContent, // Fallback plain text content
    html: htmlContent  // HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
