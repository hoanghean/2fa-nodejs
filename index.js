const express = require('express');
const speakeasy = require('speakeasy');

const app = express();
const port = 3000;

// Endpoint để nhận tham số secret và trả về JSON với mã OTP và thời gian còn lại
app.get('/', (req, res) => {
  const { secret } = req.query;

  if (!secret) {
    return res.status(400).json({ error: 'Missing secret parameter' });
  }

  // Tạo mã OTP
  const otp = speakeasy.totp({
    secret: secret,
    encoding: 'base32',
  });

  // Tính thời gian còn lại
  const timeRemaining = 30 - Math.floor((Date.now() / 1000) % 30);

  // Trả về JSON với mã OTP và thời gian còn lại
  res.json({
    otp: otp,
    time_remaining: timeRemaining,
  });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
