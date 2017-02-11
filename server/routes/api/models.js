const {Model} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/models/{_id?}`,

    config: {
      validate: {

        params: {
          _id: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL, Scopes.FAMILY]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        Model.find({isActive, _id}, projection)
        .then(model => {
          if (!model) return res(Boom.notFound());
          return res({model});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        Model.find({isActive}, projection) //uit resultaten halen
        .then(models => {
          return res({models});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/models`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN]
      },

      validate: {

        params: {
          _id: Joi.objectId()
        },

        options: {
          abortEarly: false
        },

        payload: {
          name: Joi.string().min(3).required(),
          description: Joi.string().min(3).required(),
          image: Joi.string().min(3).required(),
          themes: Joi.array(),
          isActive: Joi.boolean()
        }

      }

    },

    handler: (req, res) => {

      const fields = [`name`, `description`, `image`, `themes`, `isActive`];

      const data = pick(req.payload, fields);
      const model = new Model(data);

      model.save()
      .then(model => {
        if (!model) return res(Boom.badRequest(`Cannot save model.`));
        model = omit(model.toJSON(), [`__v`, `isActive`]);
        return res(model);
      })
      .catch(() => res(Boom.badRequest(`Cannot save model.`)));

    }

  },

  {

    method: `PUT`,
    path: `${base}/models/{_id}`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN]
      },

      validate: {

        params: {
          _id: Joi.objectId()
        },

        options: {
          abortEarly: false
        },

        payload: {
          name: Joi.string().min(3),
          description: Joi.string().min(3),
          image: Joi.string().min(3),
          themes: Joi.array(),
        }

      }

    },

    handler: (req, res) => {

      const {_id} = req.params;

      const  fields = [`name`, `description`, `image`, `themes`];

      const query = {_id: _id};
      const data = pick(req.payload, fields);
      const update = {new: true};

      Model.findOneAndUpdate(query, data, update)
        .then(model => {
          if (!model) return res(Boom.badRequest(`Cannot update model.`));
          model = omit(model.toJSON(), [`__v`, `isActive`]);
          return res(model);
        })
        .catch(() => res(Boom.badRequest(`Cannot update model.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/models/{_id?}`,

    config: {
      validate: {

        params: {
          _id: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;
      const query = {_id: _id};
      const data = {isActive: false};
      const update = {new: true};

      Model.findOneAndUpdate(query, data, update)
        .then(model => {
          if (!model) return res(Boom.badRequest(`Cannot delete model.`));
          model = omit(model.toJSON(), [`__v`]);
          return res(model);
        })
        .catch(() => res(Boom.badRequest(`Cannot delete model.`)));

    }
  }

];
