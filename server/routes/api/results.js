const {Result} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/results/{_id?}`,

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
      const {familyModelId} = req.query;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        Result.find({_id, isActive}, projection)
        .then(result => {
          if (!result) return res(Boom.notFound());
          return res({result});
        })
        .catch(() => res(Boom.badRequest()));

      } else if (familyModelId) {

        Result.find({familyModelId, isActive}, projection)
        .then(results => {
          if (!results) return res(Boom.notFound());
          return res({results});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        Result.find({isActive}, projection)
        .then(results => {
          return res({results});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/results`,

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
          familyModelId: Joi.string().alphanum().min(3).required(),
          result: Joi.array().required(),
          isActive: Joi.boolean()
        }

      }

    },

    handler: (req, res) => {

      let fields = [`familyModelId`, `result`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`];
      }

      const data = pick(req.payload, fields);
      data.professionalId = req.getUser().sub;
      const result = new Result(data);

      console.log(result);

      result.save()
      .then(result => {
        console.log(`bijna saven`);
        if (!result) return res(Boom.badRequest(`Cannot save result.`));
        result = omit(result.toJSON(), [`__v`, `isActive`]);
        return res(result);
      })
      .catch(() => res(Boom.badRequest(`test.`)));

    }

  },

  {

    method: `PUT`,
    path: `${base}/results/{_id}`,

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
          result: Joi.array().required()
        }

      }

    },

    handler: (req, res) => {

      const {_id} = req.params;
      const  fields = [`result`];

      let query = {_id: _id};
      if (req.hasScope(Scopes.PROFESSIONAL)) query = {_id: _id, professionalId: req.getUser().sub};

      const data = pick(req.payload, fields);
      const update = {new: true};

      Result.findOneAndUpdate(query, data, update)
        .then(result => {
          if (!result) return res(Boom.badRequest(`Cannot update note.`));
          result = omit(result.toJSON(), [`__v`, `isActive`]);
          return res(result);
        })
        .catch(() => res(Boom.badRequest(`Cannot update note.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/results/{_id}`,

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

      Result.findOneAndUpdate(query, data, update)
        .then(result => {
          if (!result) return res(Boom.badRequest(`Cannot delete note.`));
          result = omit(result.toJSON(), [`__v`]);
          return res(result);
        })
        .catch(() => res(Boom.badRequest(`Cannot delete note.`)));

    }
  }

];
