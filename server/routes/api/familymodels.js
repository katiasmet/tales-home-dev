const {FamilyModel} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/familymodels/{_id?}`,

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

        FamilyModel.find({isActive, _id}, projection)
        .then(familyModel => {
          if (!familyModel) return res(Boom.notFound());
          return res({familyModel});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        FamilyModel.find({isActive}, projection) //uit resultaten halen
        .then(familyModels => {
          return res({familyModels});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/familymodels`,

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
          familyId: Joi.string().min(3).required(),
          modelId: Joi.string().min(3).required(),
        }

      }

    },

    handler: (req, res) => {

      let fields = [`familyId`, `modelId`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`];
      }

      const data = pick(req.payload, fields);
      const familyModel = new FamilyModel(data);

      familyModel.save()
      .then(familyModel => {
        if (!familyModel) return res(Boom.badRequest(`Cannot save familymodel.`));
        familyModel = omit(familyModel.toJSON(), [`__v`, `isActive`]);
        return res(familyModel);
      })
      .catch(() => res(Boom.badRequest(`Cannot save familymodel.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/familymodels/{_id}`,

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

      /* TODO familymodel kan enkel door de professional gelinked aan de family verwijderd worden */

      const {_id} = req.params;
      const query = {_id: _id};
      const data = {isActive: false};
      const update = {new: true};

      FamilyModel.findOneAndUpdate(query, data, update)
        .then(familyModel => {
          if (!familyModel) return res(Boom.badRequest(`Cannot delete familymodel.`));
          familyModel = omit(familyModel.toJSON(), [`__v`]);
          return res(familyModel);
        })
        .catch(() => res(Boom.badRequest(`Cannot delete familymodel.`)));

    }
  }

];
