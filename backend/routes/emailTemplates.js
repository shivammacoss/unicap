import express from 'express'
import EmailTemplate from '../models/EmailTemplate.js'
import EmailSettings from '../models/EmailSettings.js'
import { testSMTPConnection } from '../services/emailService.js'

const router = express.Router()

// Common footer with regulatory text - Dark theme
const getEmailFooter = () => `
    <!-- App Download Section -->
    <div style="text-align: center; margin: 30px 0 20px 0;">
      <p style="color: #aaa; font-size: 14px; margin: 0 0 15px 0;">Trade via our <span style="color: #3b82f6; font-weight: bold;">Bluestone</span> iOS or Android App</p>
      <table align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 0 8px;">
            <a href="#" style="text-decoration: none;">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" style="height: 60px; border: 0; display: block;">
            </a>
          </td>
          <td style="padding: 0 8px;">
            <a href="#" style="text-decoration: none;">
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" alt="Download on the App Store" style="height: 40px; border: 0; display: block;">
            </a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Social Media Icons -->
    <div style="text-align: center; margin: 20px 0; padding: 15px 0;">
      <a href="https://facebook.com/bluestoneexchange" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style="width: 36px; height: 36px; border: 0;">
      </a>
      <a href="https://t.me/bluestoneexchange" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" style="width: 36px; height: 36px; border: 0;">
      </a>
      <a href="https://instagram.com/bluestoneexchange" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" style="width: 36px; height: 36px; border: 0;">
      </a>
      <a href="https://youtube.com/bluestoneexchange" style="display: inline-block; margin: 0 8px; text-decoration: none;">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" style="width: 36px; height: 36px; border: 0;">
      </a>
    </div>

    <!-- Trading Categories -->
    <div style="text-align: center; margin: 20px 0;">
      <p style="color: #ffffff; font-size: 12px; margin: 0;">
        CFDs on <span style="color: #ffffff;">INDICES</span> | <span style="color: #ffffff;">SHARES</span> | <span style="color: #ffffff;">FOREX</span> | <span style="color: #ffffff;">COMMODITIES</span>
      </p>
      <p style="color: #ffffff; font-size: 12px; margin: 5px 0 0 0;">
        <a href="https://bluestoneexchange.com/legal" style="color: #ffffff; text-decoration: none;">Legal Documents</a> | 
        <a href="https://bluestoneexchange.com/privacy-policy" style="color: #ffffff; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>

    <!-- Banner Section with Email Banner Image -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="https://bluestoneexchange.com" style="display: block; text-decoration: none;">
        <img src="https://bluestoneexchange.com/email_banner.png" alt="Bluestone Exchange" style="max-width: 100%; width: 100%; height: auto; border-radius: 8px; display: block; border: 0;">
      </a>
    </div>

    <!-- Regulatory Footer -->
    <div style="background-color: #0f0f1a; padding: 25px 20px; margin-top: 20px; border-top: 1px solid #333;">
      <p style="color: #888; font-size: 11px; line-height: 1.6; margin: 0 0 15px 0; text-align: justify;">
        <strong style="color: #aaa;">Risk Warning:</strong> FX and CFDs are leveraged products and involve a high level of risk. Trading may result in losses exceeding your initial investment and may not be suitable for all investors. Please ensure you fully understand the risks before trading. Past performance is not indicative of future results.
      </p>
      
      <p style="color: #888; font-size: 11px; line-height: 1.6; margin: 0 0 15px 0; text-align: justify;">
        <strong style="color: #aaa;">Disclaimer:</strong> The information on this website is provided for general informational purposes only and does not take into account your investment objectives or financial situation. Access to this website is at your own initiative. Bluestone Exchange Ltd makes no representations or warranties as to the accuracy or completeness of the content and accepts no liability for any reliance placed on it.
      </p>
      
      <p style="color: #888; font-size: 11px; line-height: 1.6; margin: 0; text-align: justify;">
        <strong style="color: #aaa;">Regulatory Notice:</strong> Bluestone Exchange Ltd is a trading name of Bluestone Exchange and Bluestone Exchange Cyprus Limited. Bluestone Exchange Europe Limited is authorised and regulated as an Investment Firm by the Cyprus Securities and Exchange Commission (licence number Z157892L).
      </p>
    </div>
`

// Email wrapper template - Dark theme
const wrapEmailContent = (content) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bluestone Exchange</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a14; font-family: Arial, Helvetica, sans-serif;">
  <!-- Outer wrapper for full background -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a14; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main email container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; border: 1px solid #333;">
          <!-- Header with Logo -->
          <tr>
            <td style="text-align: center; padding: 30px 20px; border-bottom: 1px solid #333;">
              <img src="https://bluestoneexchange.com/logo.png" alt="Bluestone Exchange" style="max-width: 200px; height: auto;">
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 30px 40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td>
              ${getEmailFooter()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

// Default email templates - Professional Vantage-style design
const defaultTemplates = [
  {
    name: 'Admin/Employee Login OTP',
    slug: 'admin_login_otp',
    subject: 'Login Verification - Bluestone Exchange',
    description: 'Sent when admin or employee logs in to verify with OTP',
    category: 'verification',
    variables: ['otp', 'firstName', 'email', 'expiryMinutes', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        A login attempt was made to your admin account. Use the following OTP to complete your login:
      </p>
      
      <p style="color: #888; font-size: 13px; margin: 20px 0 8px 0;">🔐 Your Login OTP:</p>
      <p style="color: #f59e0b; font-size: 22px; letter-spacing: 4px; margin: 0 0 20px 0;">{{otp}}</p>
      
      <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">This code will expire in {{expiryMinutes}} minutes.</p>
      
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px 20px; margin: 25px 0;">
        <p style="color: #dc2626; font-size: 14px; margin: 0;">⚠️ If you didn't attempt to login, please secure your account immediately and contact support.</p>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Email Verification OTP',
    slug: 'email_verification',
    subject: 'Verify Your Email - Bluestone Exchange',
    description: 'Sent when a user registers to verify their email with OTP',
    category: 'verification',
    variables: ['otp', 'firstName', 'email', 'expiryMinutes', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for registering with Bluestone Exchange. To complete your registration, please verify your email address using the OTP below.
      </p>
      
      <p style="color: #888; font-size: 13px; margin: 20px 0 8px 0;">Your Verification Code:</p>
      <p style="color: #22c55e; font-size: 22px; letter-spacing: 4px; margin: 0 0 20px 0;">{{otp}}</p>
      
      <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">This code will expire in {{expiryMinutes}} minutes.</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        If you did not create an account with us, please ignore this email.
      </p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Challenge Completed',
    slug: 'challenge_completed',
    subject: 'Congratulations! Challenge Completed Successfully',
    description: 'Sent when a user successfully completes a trading challenge',
    category: 'challenge',
    variables: ['firstName', 'challengeName', 'fundSize', 'accountId', 'completionDate', 'loginUrl', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Congratulations! You have successfully completed the <strong>{{challengeName}}</strong> challenge.
      </p>
      
      <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #22c55e;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #22c55e; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">🎉 CHALLENGE COMPLETED</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #666;">Challenge Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #333; font-weight: bold; text-align: right;">{{challengeName}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #666;">Fund Size</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #333; font-weight: bold; text-align: right;">{{fundSize}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #666;">Account ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #333; font-weight: bold; text-align: right;">{{accountId}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Completion Date</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{completionDate}}</td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: #fff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">View Results</a>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Challenge Failed',
    slug: 'challenge_failed',
    subject: 'Challenge Failed - Try Again',
    description: 'Sent when a user fails a trading challenge',
    category: 'challenge',
    variables: ['firstName', 'challengeName', 'fundSize', 'accountId', 'failureReason', 'failureDate', 'loginUrl', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Unfortunately, you did not meet the requirements for the <strong>{{challengeName}}</strong> challenge.
      </p>
      
      <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #ef4444;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #ef4444; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">⚠️ CHALLENGE FAILED</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #666;">Challenge Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #333; font-weight: bold; text-align: right;">{{challengeName}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #666;">Fund Size</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #333; font-weight: bold; text-align: right;">{{fundSize}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #666;">Account ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #333; font-weight: bold; text-align: right;">{{accountId}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #666;">Failure Reason</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #dc2626; font-weight: bold; text-align: right;">{{failureReason}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Failure Date</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{failureDate}}</td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: #fff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Try Again</a>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Password Reset',
    slug: 'password_reset',
    subject: 'Reset Your Password - Bluestone Exchange',
    description: 'Sent when user requests password reset',
    category: 'security',
    variables: ['firstName', 'email', 'otp', 'expiryMinutes', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        You have requested to reset the password for the account <a href="mailto:{{email}}" style="color: #1e40af; text-decoration: none;">{{email}}</a>. Here is your reset code, which is available for {{expiryMinutes}} minutes and can be used only once.
      </p>
      
      <p style="color: #888; font-size: 13px; margin: 20px 0 8px 0;">Your OTP Code:</p>
      <p style="color: #3b82f6; font-size: 22px; letter-spacing: 4px; margin: 0 0 20px 0;">{{otp}}</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        If you have any questions or require assistance please do not hesitate to contact <a href="mailto:support@bluestoneexchange.com" style="color: #1e40af; text-decoration: none;">support@bluestoneexchange.com</a>.
      </p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Welcome Email',
    slug: 'welcome',
    subject: 'Welcome to Bluestone Exchange!',
    description: 'Sent after successful email verification',
    category: 'account',
    variables: ['firstName', 'email', 'loginUrl', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Welcome to <strong style="color: #1e40af;">Bluestone Exchange</strong>! Your account has been successfully created and verified.
      </p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        You're now ready to explore the world of trading with access to Forex, Indices, Commodities, and more.
      </p>
      
      <div style="background-color: #f0f9ff; border-left: 4px solid #1e40af; padding: 15px 20px; margin: 25px 0;">
        <p style="color: #333; font-size: 14px; margin: 0 0 10px 0;"><strong>Your Account Details:</strong></p>
        <p style="color: #666; font-size: 14px; margin: 0;">Email: <strong>{{email}}</strong></p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: #fff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Start Trading Now</a>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        If you have any questions, our support team is here to help at <a href="mailto:support@bluestoneexchange.com" style="color: #1e40af; text-decoration: none;">support@bluestoneexchange.com</a>.
      </p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Deposit Pending',
    slug: 'deposit_pending',
    subject: 'Deposit Request Received - ${{amount}}',
    description: 'Sent when a deposit is pending admin approval',
    category: 'transaction',
    variables: ['firstName', 'amount', 'transactionId', 'paymentMethod', 'date', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        We have received your deposit request and it is currently being reviewed by our team.
      </p>
      
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #f59e0b; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">⏳ PENDING REVIEW</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #666;">Amount</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #16a34a; font-weight: bold; text-align: right; font-size: 18px;">\${{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #666;">Transaction ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #333; text-align: right; font-family: monospace;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #666;">Payment Method</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #333; text-align: right;">{{paymentMethod}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Date</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{date}}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">You will receive another email once your deposit is processed.</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Deposit Success',
    slug: 'deposit_success',
    subject: 'Deposit Approved - ${{amount}} Added!',
    description: 'Sent when a deposit is successfully processed',
    category: 'transaction',
    variables: ['firstName', 'amount', 'transactionId', 'newBalance', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Great news! Your deposit has been approved and credited to your wallet.
      </p>
      
      <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #22c55e;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #22c55e; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">✓ APPROVED</span>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
          <p style="color: #22c55e; font-size: 36px; font-weight: bold; margin: 0;">+\${{amount}}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #666;">New Balance</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #333; font-weight: bold; text-align: right;">\${{newBalance}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Transaction ID</td>
            <td style="padding: 10px 0; color: #333; text-align: right; font-family: monospace;">{{transactionId}}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Withdrawal Pending',
    slug: 'withdrawal_pending',
    subject: 'Withdrawal Request Received - ${{amount}}',
    description: 'Sent when a withdrawal request is submitted',
    category: 'transaction',
    variables: ['firstName', 'amount', 'transactionId', 'date', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Your withdrawal request has been submitted and is being processed.
      </p>
      
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #f59e0b; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">⏳ PROCESSING</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #666;">Amount</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #dc2626; font-weight: bold; text-align: right; font-size: 18px;">-\${{amount}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #666;">Transaction ID</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #333; text-align: right; font-family: monospace;">{{transactionId}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Date</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{date}}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">Processing time: 1-3 business days</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Withdrawal Success',
    slug: 'withdrawal_success',
    subject: 'Withdrawal Completed - ${{amount}}',
    description: 'Sent when a withdrawal is successfully processed',
    category: 'transaction',
    variables: ['firstName', 'amount', 'transactionId', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Your withdrawal has been processed and sent to your account.
      </p>
      
      <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #22c55e;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #22c55e; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">✓ COMPLETED</span>
        </div>
        <div style="text-align: center; margin-bottom: 20px;">
          <p style="color: #dc2626; font-size: 36px; font-weight: bold; margin: 0;">-\${{amount}}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666;">Transaction ID</td>
            <td style="padding: 10px 0; color: #333; text-align: right; font-family: monospace;">{{transactionId}}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Account Banned',
    slug: 'account_banned',
    subject: 'Account Suspended - Action Required',
    description: 'Sent when a user account is banned/suspended',
    category: 'account',
    variables: ['firstName', 'reason', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Your account has been suspended due to a violation of our terms of service.
      </p>
      
      <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #ef4444;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #ef4444; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">🚫 ACCOUNT SUSPENDED</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666;">Reason</td>
            <td style="padding: 10px 0; color: #dc2626; font-weight: bold; text-align: right;">{{reason}}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        If you believe this is an error, please contact our support team at <a href="mailto:support@bluestoneexchange.com" style="color: #1e40af; text-decoration: none;">support@bluestoneexchange.com</a>.
      </p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Account Unbanned',
    slug: 'account_unbanned',
    subject: 'Account Reactivated - Welcome Back!',
    description: 'Sent when a user account is unbanned/reactivated',
    category: 'account',
    variables: ['firstName', 'loginUrl', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Great news! Your account has been reactivated and you can now access all features again.
      </p>
      
      <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #22c55e;">
        <div style="text-align: center;">
          <span style="display: inline-block; background: #22c55e; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">✓ ACCOUNT RESTORED</span>
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: #fff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Login Now</a>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'KYC Submitted',
    slug: 'kyc_submitted',
    subject: 'KYC Documents Submitted - Under Review',
    description: 'Sent when a user submits their KYC documents',
    category: 'verification',
    variables: ['firstName', 'documentType', 'submittedAt', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for submitting your KYC documents. Our team is now reviewing your submission.
      </p>
      
      <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #f59e0b;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #f59e0b; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">📄 UNDER REVIEW</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fde68a; color: #666;">Document Type</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fde68a; color: #333; font-weight: bold; text-align: right;">{{documentType}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Submitted At</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{submittedAt}}</td>
          </tr>
        </table>
      </div>
      
      <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">⏳ Verification usually takes 24-48 hours. We'll notify you once your documents are reviewed.</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'KYC Approved',
    slug: 'kyc_approved',
    subject: 'KYC Verified - Account Fully Activated',
    description: 'Sent when admin approves user KYC documents',
    category: 'verification',
    variables: ['firstName', 'documentType', 'approvedAt', 'loginUrl', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Congratulations! Your KYC documents have been verified and your account is now fully activated.
      </p>
      
      <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #22c55e;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #22c55e; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">✅ VERIFIED</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #666;">Document Type</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #333; font-weight: bold; text-align: right;">{{documentType}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Approved At</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{approvedAt}}</td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: #fff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Start Trading</a>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'KYC Rejected',
    slug: 'kyc_rejected',
    subject: 'KYC Verification Failed - Action Required',
    description: 'Sent when admin rejects user KYC documents',
    category: 'verification',
    variables: ['firstName', 'documentType', 'rejectionReason', 'rejectedAt', 'loginUrl', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Dear {{firstName}},</p>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
        Unfortunately, we were unable to verify your KYC documents. Please review the reason below and resubmit.
      </p>
      
      <div style="background-color: #fef2f2; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #ef4444;">
        <div style="text-align: center; margin-bottom: 15px;">
          <span style="display: inline-block; background: #ef4444; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold;">❌ REJECTED</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #666;">Document Type</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #333; font-weight: bold; text-align: right;">{{documentType}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #666;">Rejection Reason</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #fecaca; color: #dc2626; font-weight: bold; text-align: right;">{{rejectionReason}}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Rejected At</td>
            <td style="padding: 10px 0; color: #333; text-align: right;">{{rejectedAt}}</td>
          </tr>
        </table>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: #fff; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Resubmit Documents</a>
      </div>
      
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 30px 0 5px 0;">Kind regards,</p>
      <p style="color: #1e40af; font-size: 15px; font-weight: bold; margin: 0;">Bluestone Exchange</p>
    `)
  },
  {
    name: 'Contact Inquiry',
    slug: 'contact_inquiry',
    subject: 'New Contact Inquiry from {{name}}',
    description: 'Sent to support when someone submits the contact form',
    category: 'support',
    variables: ['name', 'email', 'phone', 'message', 'date', 'year'],
    htmlContent: wrapEmailContent(`
      <p style="color: #aaa; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">New Contact Form Submission</p>
      
      <div style="background-color: #1a1a2e; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #333;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-weight: bold;">{{name}}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #3b82f6;"><a href="mailto:{{email}}" style="color: #3b82f6; text-decoration: none;">{{email}}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff;">{{phone}}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #888;">Submitted At</td>
            <td style="padding: 12px 0; color: #aaa;">{{date}}</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #0f0f23; border-left: 4px solid #3b82f6; padding: 15px 20px; margin: 25px 0;">
        <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">MESSAGE:</p>
        <p style="color: #fff; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">{{message}}</p>
      </div>
      
      <p style="color: #888; font-size: 13px; margin: 20px 0 0 0;">Please respond to this inquiry at your earliest convenience.</p>
    `)
  }
]

// GET /api/email-templates - Get all templates
router.get('/', async (req, res) => {
  try {
    const templates = await EmailTemplate.find().sort({ category: 1, name: 1 })
    res.json({ success: true, templates })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/email-templates/:id - Get single template
router.get('/:id', async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id)
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' })
    }
    res.json({ success: true, template })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// PUT /api/email-templates/:id - Update template
router.put('/:id', async (req, res) => {
  try {
    const { subject, htmlContent, isEnabled } = req.body
    const template = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      { subject, htmlContent, isEnabled },
      { new: true }
    )
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' })
    }
    res.json({ success: true, template, message: 'Template updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// PUT /api/email-templates/:id/toggle - Toggle template enabled status
router.put('/:id/toggle', async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id)
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' })
    }
    template.isEnabled = !template.isEnabled
    await template.save()
    res.json({ success: true, template, message: `Template ${template.isEnabled ? 'enabled' : 'disabled'}` })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/email-templates/seed - Seed default templates
router.post('/seed', async (req, res) => {
  try {
    for (const template of defaultTemplates) {
      await EmailTemplate.findOneAndUpdate(
        { slug: template.slug },
        template,
        { upsert: true, new: true }
      )
    }
    res.json({ success: true, message: 'Default templates seeded successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/email-templates/settings/smtp - Get email settings
router.get('/settings/smtp', async (req, res) => {
  try {
    let settings = await EmailSettings.findOne()
    if (!settings) {
      settings = await EmailSettings.create({})
    }
    // Don't send password in response
    const safeSettings = {
      ...settings.toObject(),
      smtpPass: settings.smtpPass ? '********' : ''
    }
    res.json({ success: true, settings: safeSettings })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// PUT /api/email-templates/settings/smtp - Update email settings
router.put('/settings/smtp', async (req, res) => {
  try {
    const { smtpHost, smtpPort, smtpUser, smtpPass, smtpSecure, fromEmail, fromName, otpVerificationEnabled, otpExpiryMinutes } = req.body
    
    let settings = await EmailSettings.findOne()
    if (!settings) {
      settings = new EmailSettings()
    }
    
    settings.smtpHost = smtpHost
    settings.smtpPort = smtpPort
    settings.smtpUser = smtpUser
    if (smtpPass && smtpPass !== '********') {
      settings.smtpPass = smtpPass
    }
    settings.smtpSecure = smtpSecure
    settings.fromEmail = fromEmail
    settings.fromName = fromName
    if (otpVerificationEnabled !== undefined) {
      settings.otpVerificationEnabled = otpVerificationEnabled
    }
    if (otpExpiryMinutes !== undefined) {
      settings.otpExpiryMinutes = otpExpiryMinutes
    }
    
    await settings.save()
    res.json({ success: true, message: 'Email settings updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// PUT /api/email-templates/settings/toggle-smtp - Toggle SMTP on/off
router.put('/settings/toggle-smtp', async (req, res) => {
  try {
    let settings = await EmailSettings.findOne()
    if (!settings) {
      settings = new EmailSettings()
    }
    settings.smtpEnabled = !settings.smtpEnabled
    await settings.save()
    res.json({ 
      success: true, 
      smtpEnabled: settings.smtpEnabled,
      message: settings.smtpEnabled ? 'SMTP enabled' : 'SMTP disabled'
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/email-templates/settings/test - Test SMTP connection
router.post('/settings/test', async (req, res) => {
  try {
    const result = await testSMTPConnection()
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/email-templates/settings/send-test - Send a test email
router.post('/settings/send-test', async (req, res) => {
  try {
    const { toEmail } = req.body
    if (!toEmail) {
      return res.status(400).json({ success: false, message: 'Email address is required' })
    }

    const settings = await EmailSettings.findOne()
    if (!settings || !settings.smtpHost) {
      return res.status(400).json({ success: false, message: 'SMTP settings not configured' })
    }

    const nodemailer = await import('nodemailer')
    
    // Port 465 = SSL, Port 587 = STARTTLS (secure should be false)
    const useSecure = settings.smtpPort === 465 ? true : settings.smtpSecure
    
    const transporter = nodemailer.default.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: useSecure,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPass
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const mailOptions = {
      from: '"' + settings.fromName + '" <' + settings.fromEmail + '>',
      to: toEmail,
      subject: 'Test Email - SMTP Configuration Working!',
      html: '<!DOCTYPE html><html><body style="margin: 0; padding: 40px; background-color: #0a0a0a; font-family: Arial, sans-serif;"><div style="max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; border: 1px solid #333;"><h1 style="color: #22c55e; margin: 0 0 20px; text-align: center;">✓ Test Successful!</h1><p style="color: #aaa; margin: 0 0 20px; line-height: 1.6; text-align: center;">Your SMTP configuration is working correctly.</p><div style="background: #0f0f23; border-radius: 8px; padding: 15px; margin-bottom: 20px;"><p style="color: #888; margin: 0 0 5px; font-size: 12px;">SMTP Host</p><p style="color: #fff; margin: 0;">' + settings.smtpHost + ':' + settings.smtpPort + '</p></div><p style="color: #666; font-size: 12px; margin: 0; text-align: center;">Sent at ' + new Date().toLocaleString() + '</p></div></body></html>'
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Test email sent to ' + toEmail })
  } catch (error) {
    console.error('Send test email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/email-templates/:id/test - Send a test email using specific template
router.post('/:id/test', async (req, res) => {
  try {
    const { toEmail } = req.body
    if (!toEmail) {
      return res.status(400).json({ success: false, message: 'Email address is required' })
    }

    const template = await EmailTemplate.findById(req.params.id)
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' })
    }

    const settings = await EmailSettings.findOne()
    if (!settings || !settings.smtpHost) {
      return res.status(400).json({ success: false, message: 'SMTP settings not configured' })
    }

    const nodemailer = await import('nodemailer')
    const useSecure = settings.smtpPort === 465
    
    const transporter = nodemailer.default.createTransport({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: useSecure,
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPass
      },
      tls: { rejectUnauthorized: false }
    })

    // Generate sample data for template variables
    const sampleData = {
      firstName: 'John',
      email: toEmail,
      otp: '123456',
      expiryMinutes: '10',
      amount: '500.00',
      transactionId: 'TXN' + Date.now(),
      paymentMethod: 'Bank Transfer',
      date: new Date().toLocaleDateString(),
      newBalance: '1,500.00',
      platformName: settings.fromName || 'Trading Platform',
      supportEmail: settings.fromEmail || 'support@example.com',
      loginUrl: 'http://localhost:5173/login',
      reason: 'Violation of terms of service',
      year: new Date().getFullYear().toString()
    }

    // Replace variables in template
    let subject = template.subject
    let html = template.htmlContent
    for (const [key, value] of Object.entries(sampleData)) {
      const regex = new RegExp('{{' + key + '}}', 'g')
      subject = subject.replace(regex, value)
      html = html.replace(regex, value)
    }

    const mailOptions = {
      from: '"' + settings.fromName + '" <' + settings.fromEmail + '>',
      to: toEmail,
      subject: '[TEST] ' + subject,
      html: html
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true, message: 'Test email sent to ' + toEmail })
  } catch (error) {
    console.error('Send template test email error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
})

// DELETE /api/email-templates/:id - Delete a template
router.delete('/:id', async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndDelete(req.params.id)
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' })
    }
    res.json({ success: true, message: 'Template deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/email-templates/reset - Reset all templates (delete all and reseed)
router.post('/reset', async (req, res) => {
  try {
    await EmailTemplate.deleteMany({})
    for (const template of defaultTemplates) {
      await EmailTemplate.create(template)
    }
    res.json({ success: true, message: 'All templates reset to defaults' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// POST /api/email-templates/sync - Sync templates (add missing, update existing)
router.post('/sync', async (req, res) => {
  try {
    let added = 0
    let updated = 0
    for (const template of defaultTemplates) {
      const existing = await EmailTemplate.findOne({ slug: template.slug })
      if (existing) {
        // Force update existing template with new content
        await EmailTemplate.findOneAndUpdate(
          { slug: template.slug },
          template,
          { new: true }
        )
        updated++
      } else {
        await EmailTemplate.create(template)
        added++
      }
    }
    res.json({ success: true, message: `Sync complete: ${added} added, ${updated} updated` })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Function to seed/update email templates (called on server startup)
export const seedEmailTemplates = async () => {
  try {
    for (const template of defaultTemplates) {
      await EmailTemplate.findOneAndUpdate(
        { slug: template.slug },
        template,
        { upsert: true, new: true }
      )
    }
    console.log('[EMAIL] Email templates synced successfully')
  } catch (error) {
    console.error('[EMAIL] Error seeding email templates:', error)
  }
}

export default router



