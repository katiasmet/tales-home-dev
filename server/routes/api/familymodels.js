const {FamilyModel, Result, Note} = require(`mongoose`).models;

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
      const {familyId} = req.query;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        FamilyModel.find({isActive, _id}, projection)
        .then(familyModel => {
          if (!familyModel) return res(Boom.notFound());
          return res({familyModel});
        })
        .catch(() => res(Boom.badRequest()));

      } else if (familyId) {

        FamilyModel.find({isActive, familyId}, projection)
        .then(familyModels => {
          if (!familyModels) return res(Boom.notFound());
          return res({familyModels});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        FamilyModel.find({isActive}, projection)
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
          familyId: Joi.string().alphanum().min(3).required(),
          modelId: Joi.string().alphanum().min(3).required(),
          isActive: Joi.boolean()
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
      const {familyId} = req.query;

      let query = {_id: _id};
      const data = {isActive: false};
      const update = {new: true};

      if (familyId) {

        const projection = `-__v`;
        const isActive = true;

        FamilyModel.find({isActive, familyId}, projection)
        .then(familyModels => {
          if (!familyModels) return res(Boom.notFound(`We could not find any models of this family`));
          return familyModels;
        })
        .then(familyModels => {
          familyModels.forEach(familyModel => {
            query = {_id: familyModel._id};
            FamilyModel.findOneAndUpdate(query, data, update)
              .then(familyModelResult => {
                if (!familyModelResult) return res(Boom.badRequest(`Cannot delete familymodel.`));
                return familyModelResult;
              })
              .then(() => {
                query = {familyModelId: familyModel._id};
                return Result.findOneAndUpdate(query, data, update)
                .then(result => {
                  if (!result) return `This family has no results of this model.`;
                  return `Successfully deleted results.`;
                })
                .catch(() => res(Boom.badRequest(`Cannot delete results.`)));
              })
              .then(message => {
                query = {familyModelId: familyModel._id};
                return Note.findOneAndUpdate(query, data, update)
                .then(note => {
                  if (!note) return (`${message  }Successfully deleted notes.`);
                  return (`${message  }Successfully deleted notes.`);
                })
                .catch(() => res(Boom.badRequest(`Cannot delete notes.`)));
              })
              .then(message => {
                return res(`Succesfully deleted familymodels, notes, results.${  message}`);
              })
              .catch(() => res(Boom.badRequest(`Cannot delete familymodel.`)));
          });
        })
        .catch(() => res(Boom.badRequest()));

      } else {
        FamilyModel.findOneAndUpdate(query, data, update)
          .then(familyModel => {
            if (!familyModel) return res(Boom.badRequest(`Cannot delete familymodel.`));
            familyModel = omit(familyModel.toJSON(), [`__v`]);
            return res(familyModel);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete familymodel.`)));
      }

    }
  }

];
