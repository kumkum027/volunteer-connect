const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const orgs = [
  {
    name: 'Admin',
    organizationName: 'Helping Hands NGO',
    email: 'org1@test.com',
    password: 'password123',
    role: 'organization',
    phone: '1234567890'
  },
  {
    name: 'Admin',
    organizationName: 'Green Earth Foundation',
    email: 'org2@test.com',
    password: 'password123',
    role: 'organization',
    phone: '0987654321'
  }
];

const importData = async () => {
  try {
    // Delete existing organizations
    await User.deleteMany({ role: 'organization' });
    
    for (let org of orgs) {
      await User.create(org);
    }
    console.log('Organizations Imported... You can login with org1@test.com or org2@test.com (password: password123)');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
