const trabajosMock = [
  {
    id: 'a9748581-dfdc-4a78-930d-5205a2ccef48',
    firstName: 'Tatyana',
    lastName: 'Vondya',
    fecha: '02/05/2020',
    jobTitle: 'Central Branding Representative',
    twitter: 'TatyanaVon35871-3686'
  },
  {
    id: '1921a734-cc05-4f71-a677-ffe38dda6958',
    firstName: 'Maude',
    lastName: 'Effertz',
    fecha: '05/05/2020',
    jobTitle: 'Product Solutions Analyst',
    twitter: 'MaudeEffertz73114'
  }
];

class BadgesServiceMock {
  async getBadges() {
    return Promise.resolve(trabajosMock);
  }

  async createBadge() {
    return Promise.resolve(trabajosMock[0].id);
  }

  async updateBadge() {
    return Promise.resolve(trabajosMock[0].id);
  }

  async deleteBadge() {
    return Promise.resolve(trabajosMock[0].id);
  }
}

module.exports = {
  trabajosMock,
  BadgesServiceMock
};
