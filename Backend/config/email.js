const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
  try {
    const response = await resend.emails.send({
      from: 'CareerPilot AI <onboarding@resend.dev>',
      to: email,
      subject: 'Your CareerPilot AI OTP Code',
      html: `
        <h2>CareerPilot AI Verification</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      `
    });

    console.log('OTP email sent:', response);
    return true;
  } catch (error) {
    console.error('RESEND ERROR:', error);
    return false;
  }
};

module.exports = { sendOTPEmail };