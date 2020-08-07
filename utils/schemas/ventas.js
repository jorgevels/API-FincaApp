const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

// llamamos join.string para indicar que es un string
/**
 * llamamos regex porque los ids de mongodb tienen cierta estructura y es una muy buena
 * forma de validarlo mediante un regex, porque son una collection de caracteres alphanumericos
 * que tienen un minimo de 24 caracteres.
 *
 * /^[0-9]: inicia con cualquiera de los caracteres alphanumericos del 0 al 9
 * /^[0-9a-fA-F]: de la a minuscula a la f minuscula, y de la A mayuscula a la F mayúscula
 * /^[0-9a-fA-F]{24}$/: puede tener un tamaño de 24 y así es com debe terminar.
 */

const ventaIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nameVentaSchema = Joi.string().min(4);
const ventasDateSchema = Joi.date()
  .format('YYYY-MM-DD')
  .utc();
const valorVentaSchema = Joi.number();

const createVentaSchema = {
  nameVenta: nameVentaSchema.required(),
  fechaVenta: ventasDateSchema.required(),
  valorVenta: valorVentaSchema.required()
};

// Solo vamos a actualizar una parte de la venta
const updateVentaSchema = {
  nameVenta: nameVentaSchema,
  fechaVenta: ventasDateSchema,
  valorVenta: valorVentaSchema
};
module.exports = {
  ventaIdSchema,
  createVentaSchema,
  updateVentaSchema
};
