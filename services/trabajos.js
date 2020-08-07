const MongoLib = require('../lib/mongo');

class BadgesService {
  constructor() {
    this.collection = 'trabajos';
    this.mongoDB = new MongoLib();
  }

  async getBadges() {
    const trabajos = await this.mongoDB.getAll(this.collection);
    return trabajos || [];
  }

  async getBadge({ badgeId }) {
    const trabajo = await this.mongoDB.get(this.collection, badgeId);
    return trabajo || {};
  }

  async createBadge({ trabajo }) {
    const createdBadgeId = await this.mongoDB.create(this.collection, trabajo);
    return createdBadgeId;
  }

  async updateBadge({ badgeId, trabajo } = {}) {
    const updatedBadgeId = await this.mongoDB.update(
      this.collection,
      badgeId,
      trabajo
    );
    return updatedBadgeId;
  }

  async deleteBadge({ badgeId }) {
    const deletedBadgeId = await this.mongoDB.delete(this.collection, badgeId);
    return deletedBadgeId;
  }
}

module.exports = BadgesService;
