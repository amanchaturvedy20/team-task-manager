import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }

    req.validatedBody = value;
    next();
  };
};

// Signup validation
export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
});

// Login validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Project validation
export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(1000).allow(''),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().max(1000).allow(''),
  status: Joi.string().valid('active', 'archived', 'completed'),
});

// Task validation
export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(1000).allow(''),
  assignedToId: Joi.string().hex().length(24).allow(null),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
  dueDate: Joi.date().iso().allow(null),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  description: Joi.string().max(1000).allow(''),
  status: Joi.string().valid('todo', 'in_progress', 'completed', 'cancelled'),
  assignedToId: Joi.string().hex().length(24).allow(null),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  dueDate: Joi.date().iso().allow(null),
});

// Project member validation
export const addProjectMemberSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  role: Joi.string().valid('owner', 'lead', 'member').default('member'),
});

