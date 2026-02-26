const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

// Admin credentials
const ADMIN_EMAIL = 'admin@unicap.com'
const ADMIN_PASSWORD = 'Admin@123'
const ADMIN_FIRST_NAME = 'Super'
const ADMIN_LAST_NAME = 'Admin'
const ADMIN_URL_SLUG = 'unicap'

// Define admin schema directly for this script
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN'], default: 'ADMIN' },
  urlSlug: { type: String, required: true, unique: true, lowercase: true },
  brandName: { type: String, default: '' },
  logo: { type: String, default: '' },
  parentAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
  sidebarPermissions: {
    overviewDashboard: { type: Boolean, default: true },
    userManagement: { type: Boolean, default: true },
    tradeManagement: { type: Boolean, default: true },
    fundManagement: { type: Boolean, default: true },
    bankSettings: { type: Boolean, default: true },
    ibManagement: { type: Boolean, default: true },
    forexCharges: { type: Boolean, default: true },
    earningsReport: { type: Boolean, default: true },
    copyTrade: { type: Boolean, default: true },
    propFirmChallenges: { type: Boolean, default: true },
    accountTypes: { type: Boolean, default: true },
    themeSettings: { type: Boolean, default: true },
    emailTemplates: { type: Boolean, default: true },
    bonusManagement: { type: Boolean, default: true },
    adminManagement: { type: Boolean, default: true },
    employeeManagement: { type: Boolean, default: true },
    kycVerification: { type: Boolean, default: true },
    supportTickets: { type: Boolean, default: true }
  },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'PENDING'], default: 'ACTIVE' },
  lastLogin: { type: Date, default: null }
}, { timestamps: true })

const Admin = mongoose.model('Admin', adminSchema)

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
