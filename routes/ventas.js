const express = require('express');

const VentasService = require('../services/ventas');
const validationHandler = require('../utils/middleware/validationHandler.js');
const cacheResponse = require('../utils/cacheResponse');

const { FIVE_SEC, TEN_SEC } = require('../utils/time');
const {
  ventaIdSchema,
  createVentaSchema,
  updateVentaSchema
} = require('../utils/schemas/ventas');

function ventasApi(app) {
  const router = express.Router();
  app.use('/ventas', router);

  const ventasService = new VentasService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_SEC);

    try {
      const ventas = await ventasService.getVentas();
      res.status(200).json({
        data: ventas,
        message: 'Ventas listed'
      });
    } catch (error) {
      next(error);
    }
  });

  // Obtener venta por id
  router.get(
    '/:ventaId',
    validationHandler({ ventaId: ventaIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, TEN_SEC);
      const { ventaId } = req.params;

      try {
        const venta = await ventasService.getVenta({
          ventaId
        });
        res.status(200).json({
          data: venta,
          message: 'venta retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createVentaSchema),
    async (req, res, next) => {
      const { body: venta } = req;

      try {
        const createdVentaId = await ventasService.createVenta({ venta });
        res.status(201).json({
          data: createdVentaId,
          message: 'Venta created'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:ventaId',
    validationHandler({ ventaId: ventaIdSchema }, 'params'),
    validationHandler(updateVentaSchema),
    async (req, res, next) => {
      const { ventaId } = req.params;
      const { body: venta } = req;

      try {
        const updatedVentaId = await ventasService.updateVenta({
          ventaId,
          venta
        });
        res.status(200).json({
          data: updatedVentaId,
          message: 'Venta updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:ventaId',
    validationHandler({ ventaId: ventaIdSchema }, 'params'),
    async (req, res, next) => {
      const { ventaId } = req.params;
      try {
        const deleteVentaId = await ventasService.deleteVenta({ ventaId });
        res.status(200).json({
          data: deleteVentaId,
          message: 'Venta deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = ventasApi;
