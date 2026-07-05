const User = require('../models/User');

const seedOrganizations = async () => {
  const organizations = [
    {
      organizationName: "Red Cross NGO",
      email: "org1@test.com",
      password: "password123",
      role: "organization"
    },
    {
      organizationName: "Green Earth Foundation",
      email: "org2@test.com",
      password: "password123",
      role: "organization"
    }
  ];

  for (const org of organizations) {
    const exists = await User.findOne({ email: org.email });

    if (!exists) {
      await User.create(org);
      console.log(`${org.organizationName} created`);
    }
  }
};

module.exports = seedOrganizations;