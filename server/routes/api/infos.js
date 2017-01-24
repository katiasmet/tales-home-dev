const {InfoText} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/infotexts/{_id?}`,

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

        InfoText.find({_id, isActive}, projection)
        .then(infotext => {
          if (!infotext) return res(Boom.notFound());
          return res({infotext});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        InfoText.find({isActive}, projection)
        .then(infotexts => {
          return res({infotexts});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/infotexts`,

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
          page: Joi.string().alphanum().min(3).required(),
          description: Joi.string().min(3).required()
        }

      }

    },

    handler: (req, res) => {

      const fields = [`page`, `description`, `isActive`];

      const data = pick(req.payload, fields);
      const infoText = new InfoText(data);

      infoText.save()
      .then(infoText => {
        if (!infoText) return res(Boom.badRequest(`Cannot save info.`));
        infoText = omit(infoText.toJSON(), [`__v`, `isActive`]);
        return res(infoText);
      })
      .catch(() => res(Boom.badRequest(`Cannot save info.`)));

    }

  },

  {

    method: `PUT`,
    path: `${base}/infotexts/{_id}`,

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
          page: Joi.string().alphanum().min(3).required(),
          description: Joi.string().min(3).required()
        }

      }

    },

    handler: (req, res) => {

      const {_id} = req.params;
      const  fields = [`page`, `description`];

      const query = {_id: _id};
      const data = pick(req.payload, fields);
      const update = {new: true};

      InfoText.findOneAndUpdate(query, data, update)
        .then(infoText => {
          if (!infoText) return res(Boom.badRequest(`Cannot update info.`));
          infoText = omit(infoText.toJSON(), [`__v`, `isActive`]);
          return res(infoText);
        })
        .catch(() => res(Boom.badRequest(`Cannot update info.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/infotexts/{_id}`,

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

      InfoText.findOneAndUpdate(query, data, update)
        .then(infoText => {
          if (!infoText) return res(Boom.badRequest(`Cannot delete info.`));
          infoText = omit(infoText.toJSON(), [`__v`]);
          return res(infoText);
        })
        .catch(() => res(Boom.badRequest(`Cannot delete info.`)));

    }
  }

];
