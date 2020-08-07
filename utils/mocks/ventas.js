const ventasMock = [
  {
    id: 'a9748581-dfdc-4a78-930d-5205a2ccef43',
    nameVenta: 'Venta cafe',
    fecha: '02/05/2020',
    valorVenta: '1500000'
  },
  {
    id: 'a9748581-dfdc-4a78-930d-5205a2ccef43',
    nameVenta: 'Venta pasilla',
    fecha: '02/05/2020',
    valorVenta: '1500000'
  }
];

class VentasServiceMock {
  async getVentas() {
    return Promise.resolve(ventasMock);
  }

  async createVenta() {
    return Promise.resolve(ventasMock[0].id);
  }

  async updateVenta() {
    return Promise.resolve(ventasMock[0].id);
  }

  async deleteVenta() {
    return Promise.resolve(ventasMock[0].id);
  }
}

module.exports = {
  ventasMock,
  VentasServiceMock
};
