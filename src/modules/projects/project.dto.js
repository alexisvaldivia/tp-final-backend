import Joi from 'joi';

export const createProjectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    goal_amount: Joi.number().precision(2).min(0).required(),
    raised_amount: Joi.number().precision(2).min(0).optional().default(0),
    status: Joi.string().valid('pendiente', 'financiado', 'rechazado').optional().default('pendiente'),
});

export const updateProjectSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().min(10).optional(),
    goal_amount: Joi.number().precision(2).min(0).optional(),
    raised_amount: Joi.number().precision(2).min(0).optional(),
    status: Joi.string().valid('pendiente', 'financiado', 'rechazado').optional(),
});

export const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});