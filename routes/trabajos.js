const express = require('express');

const BadgesService = require('../services/trabajos');
const validationHandler = require('../utils/middleware/validationHandler.js');
const cacheResponse = require('../utils/cacheResponse');

/* const { FIVE_MIN_TO_SEC, SIXTY_MIN_TO_SEC } = require('../utils/time'); */
const { FIVE_SEC, TEN_SEC } = require('../utils/time');
const {
  trabajoIdSchema,
  createTrabajoSchema,
  updateTrabajoSchema
} = require('../utils/schemas/trabajos');

function badgesApi(app) {
  const router = express.Router();
  app.use('/trabajos', router);

  const badgesService = new BadgesService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_SEC);

    try {
      const trabajos = await badgesService.getBadges();
      res.status(200).json({
        data: trabajos,
        message: 'trabajos listed'
      });
    } catch (error) {
      next(error);
    }
  });

  // Obtener trabajo por id
  router.get(
    '/:badgeId',
    validationHandler({ badgeId: trabajoIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, TEN_SEC);
      const { badgeId } = req.params;

      try {
        const trabajo = await badgesService.getBadge({
          badgeId
        });
        res.status(200).json({
          data: trabajo,
          message: 'trabajo retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createTrabajoSchema),
    async (req, res, next) => {
      const { body: trabajo } = req;

      try {
        const createdBadgeId = await badgesService.createBadge({ trabajo });
        res.status(201).json({
          data: createdBadgeId,
          message: 'Trabajo created'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:badgeId',
    validationHandler({ badgeId: trabajoIdSchema }, 'params'),
    validationHandler(updateTrabajoSchema),
    async (req, res, next) => {
      const { badgeId } = req.params;
      const { body: trabajo } = req;

      try {
        const updatedBadgeId = await badgesService.updateBadge({
          badgeId,
          trabajo
        });
        res.status(200).json({
          data: updatedBadgeId,
          message: 'trabajo updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:badgeId',
    validationHandler({ badgeId: trabajoIdSchema }, 'params'),
    async (req, res, next) => {
      const { badgeId } = req.params;
      try {
        const deleteBadgeId = await badgesService.deleteBadge({ badgeId });
        res.status(200).json({
          data: deleteBadgeId,
          message: 'trabajo deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = badgesApi;
