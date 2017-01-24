const {Family} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/families/{_id?}`,

    config: {
      validate: {

        params: {
          _id: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        Family.find({isActive, _id}, projection)
        .then(family => {
          if (!family) return res(Boom.notFound());
          return res({family});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        Family.find({isActive}, projection) //uit resultaten halen
        .then(families => {
          return res({families});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/families`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL]
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
          origins: Joi.string().min(3),
          homeLocation: Joi.string().min(3),
          isActive: Joi.boolean()
        }

      }

    },

    handler: (req, res) => {

      let fields = [`name`, `origins`, `homeLocation`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`];
      }

      const data = pick(req.payload, fields);
      data.professionalId = req.getUser().sub;
      const family = new Family(data);

      family.save()
      .then(u => {
        if (!u) return res(Boom.badRequest(`Cannot save family.`));
        u = omit(u.toJSON(), [`__v`, `isActive`]);
        return res(u);
      })
      .catch(() => res(Boom.badRequest(`Cannot save family.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/families/{_id}`,

    config: {
      validate: {

        params: {
          _id: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;

      let query = {_id: _id, professionalId: req.getUser().sub};
      if (req.hasScope(Scopes.ADMIN)) query = {_id: _id};

      const data = {isActive: false};
      const update = {new: true};

      Family.findOneAndUpdate(query, data, update)
          .then(u => {
            if (!u) return res(Boom.badRequest(`Cannot delete family.`));
            u = omit(u.toJSON(), [`__v`]);
            return res(u);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete family.`)));

    }
  }


];
