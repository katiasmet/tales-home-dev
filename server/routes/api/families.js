const {Family} = require(`mongoose`).models;

const {pick, omit, isEmpty} = require(`lodash`);

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
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL, Scopes.FAMILY]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;
      const {professionalId} = req.query;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        Family.find({isActive, _id}, projection)
        .then(family => {
          if (!family) return res(Boom.notFound());
          return res({family});
        })
        .catch(() => res(Boom.badRequest()));

      } else if (professionalId) {

        Family.find({isActive, professionalId}, projection)
        .then(families => {
          if (!families) return res(Boom.notFound());
          return res({families});
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
          name: Joi.string().min(2).required(),
          origins: Joi.string().allow(``),
          homeLocation: Joi.string().allow(``),
          isActive: Joi.boolean()
        }

      }

    },

    handler: (req, res) => {

      let fields = [`name`];

      const {origins, homeLocation} = req.payload;
      if (!isEmpty(origins)) fields = [...fields, `origins`];
      if (!isEmpty(homeLocation)) fields = [...fields, `homeLocation`];


      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`];
      }

      const data = pick(req.payload, fields);
      data.professionalId = req.getUser().sub;
      const family = new Family(data);

      family.save()
      .then(family => {
        if (!family) return res(Boom.badRequest(`Cannot save family.`));
        family = omit(family.toJSON(), [`__v`, `isActive`]);
        return res(family);
      })
      .catch(() => res(Boom.badRequest(`Cannot save family.`)));

    }

  },

  {
    method: `DELETE`,
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

      let query = {_id: _id};
      if (req.hasScope(Scopes.PROFESSIONAL)) query = {_id: _id, professionalId: req.getUser().sub};

      const data = {isActive: false};
      const update = {new: true};

      Family.findOneAndUpdate(query, data, update)
          .then(family => {
            if (!family) return res(Boom.badRequest(`Cannot delete family.`));
            family = omit(family.toJSON(), [`__v`]);
            return res(family);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete family.`)));

    }
  }


];
