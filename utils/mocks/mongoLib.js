const sinon = require('sinon');
const { trabajosMock } = require('./trabajos');

// For test purpose only
const ID = '5de31d41a86e04593563129b';

const getAllStub = sinon.stub();
// Sin filtro
/**
 * uno de los métodos que tienen los structs es por ejemplo decidir
 *  que cuando se llamé con ciertos argumentos resuelva con cierta respuesta,
 * en esté caso vamos a decir que cuando lo llamé con movies que sería la collection que
 * le va a pasar el servicio a la librería de mongo, pues resuelva con nuestros mocks de las peliculas
 */
getAllStub.withArgs('trabajos').resolves(trabajosMock);

const createStub = sinon.stub().resolves(trabajosMock[0].id);

const updateStub = sinon
  .stub()
  .withArgs('trabajos', ID)
  .resolves(trabajosMock[0].id);

const deleteStub = sinon
  .stub()
  .withArgs('trabajos', ID)
  .resolves(trabajosMock[0].id);

// Finalmente cuando se llamé la funcion create de nuestro servicio, queremos  que lo resuelva
// con la primer movie de nuestros mocks, recuerden que en esté caso mongo devuelve el id
// no la movie completa.

// Ahora ya podemos crear nuestra clase MongoLibMock, en ella va a tener el getAll
//
class MongoLibMock {
  getAll(collection) {
    return getAllStub(collection);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    return updateStub(collection, id, data);
  }

  delete(collection, id) {
    return deleteStub(collection, id);
  }
}

module.exports = {
  getAllStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock
};
