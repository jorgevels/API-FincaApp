const MongoLib = require('../lib/mongo');

class VentasService {
  constructor() {
    this.collection = 'ventas';
    this.mongoDB = new MongoLib();
  }

  async getVentas() {
    const ventas = await this.mongoDB.getAll(this.collection);
    return ventas || [];
  }

  async getVenta({ ventaId }) {
    const venta = await this.mongoDB.get(this.collection, ventaId);
    return venta || {};
  }

  async createVenta({ venta }) {
    const createdVentaId = await this.mongoDB.create(this.collection, venta);
    return createdVentaId;
  }

  async updateVenta({ ventaId, venta } = {}) {
    const updatedVentaId = await this.mongoDB.update(
      this.collection,
      ventaId,
      venta
    );
    return updatedVentaId;
  }

  async deleteVenta({ ventaId }) {
    const deletedVentaId = await this.mongoDB.delete(this.collection, ventaId);
    return deletedVentaId;
  }
}

module.exports = VentasService;
