import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

// Admin credentials
const ADMIN_EMAIL = 'admin@unicap.com'
const ADMIN_PASSWORD = 'Admin@123'
const ADMIN_FIRST_NAME = 'Super'
const ADMIN_LAST_NAME = 'Admin'
const ADMIN_URL_SLUG = 'unicap'

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL })
    if (existingAdmin) {
      console.log('Admin already exists!')
      console.log('Email:', existingAdmin.email)
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)

    await Admin.create({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      firstName: ADMIN_FIRST_NAME,
      lastName: ADMIN_LAST_NAME,
      role: 'SUPER_ADMIN',
      urlSlug: ADMIN_URL_SLUG,
      brandName: 'unicap',
      status: 'ACTIVE',
      sidebarPermissions: {
        overviewDashboard: true,
        userManagement: true,
        tradeManagement: true,
        fundManagement: true,
        bankSettings: true,
        ibManagement: true,
        forexCharges: true,
        earningsReport: true,
        copyTrade: true,
        propFirmChallenges: true,
        accountTypes: true,
        themeSettings: true,
        emailTemplates: true,
        bonusManagement: true,
        adminManagement: true,
        employeeManagement: true,
        kycVerification: true,
        supportTickets: true
      }
    })

    console.log('\n✅ Admin created!')
    console.log('Email:', ADMIN_EMAIL)
    console.log('Password:', ADMIN_PASSWORD)
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

createAdmin()
