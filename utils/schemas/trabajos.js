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

const trabajoIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nameTrabajoSchema = Joi.string().max(100);
const nameDescripcionSchema = Joi.string().max(100);
const trabajoDateSchema = Joi.date()
  .format('YYYY-MM-DD')
  .utc();
/* const badgeJobTitleSchema = Joi.string().max(100); */
const tiempoTrabajoSchema = Joi.number().max(500);
/* const badgeTwitterSchema = Joi.string().min(4); */
const costoTrabajoSchema = Joi.number().min(4);

/* const badgeTwitterSchema = Joi.number()
  .greater(1000)
  .integer()
  .positive(); */

// Formulario de ventas
/* const trabajoNameVentaSchema = Joi.string().min(4);
const trabajoVentasDateSchema = Joi.date()
  .format('YYYY-MM-DD')
  .utc();
const trabajoValorVentaSchema = Joi.string().min(4); */

const createTrabajoSchema = {
  nombre: nameTrabajoSchema.required(),
  descripcion: nameDescripcionSchema.required(),
  fecha: trabajoDateSchema.required(),
  tiempo: tiempoTrabajoSchema.required(),
  costo: costoTrabajoSchema.required()
  /* 
  nameVenta: trabajoNameVentaSchema.required(),
  fechaVenta: trabajoVentasDateSchema.required(),
  valorVenta: trabajoValorVentaSchema.required() */
};

// Solo vamos a actualizar una parte de la pelicula
const updateTrabajoSchema = {
  nombre: nameTrabajoSchema,
  descripcion: nameDescripcionSchema,
  fecha: trabajoDateSchema,
  tiempo: tiempoTrabajoSchema,
  costo: costoTrabajoSchema

  /* nameVenta: trabajoNameVentaSchema,
  fechaVenta: trabajoVentasDateSchema,
  valorVenta: trabajoValorVentaSchema */
};
module.exports = {
  trabajoIdSchema,
  createTrabajoSchema,
  updateTrabajoSchema
};

/* const badgeEmailSchema = Joi.string().email(); */
/* const badgeDateSchema = Joi.date().max(100); */

/* email: badgeEmailSchema.required(), */
/* date: badgeDateSchema.required(), */

/* email: badgeEmailSchema, */
/* date: badgeDateSchema, */
