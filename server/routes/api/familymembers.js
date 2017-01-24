const {FamilyMember} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/familymembers/{_id?}`,

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

        FamilyMember.find({isActive, _id}, projection)
        .then(familymember => {
          if (!familymember) return res(Boom.notFound());
          return res({familymember});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        FamilyMember.find({isActive}, projection) //uit resultaten halen
        .then(familymembers => {
          return res({familymembers});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/familymembers`,

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
          firstName: Joi.string().alphanum().min(3).required(),
          languages: Joi.array().items(Joi.string()).required(),
          character: Joi.string().alphanum().min(3).required(),
          role: Joi.string().min(3).alphanum().required(),
          isActive: Joi.boolean()
        }

      }

    },

    handler: (req, res) => {

      let fields = [`familyId`, `firstName`, `languages`, `character`, `role`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`];
      }

      const data = pick(req.payload, fields);
      const familyMember = new FamilyMember(data);

      familyMember.save()
      .then(u => {
        if (!u) return res(Boom.badRequest(`Cannot save familymember.`));
        u = omit(u.toJSON(), [`__v`, `isActive`]);
        return res(u);
      })
      .catch(() => res(Boom.badRequest(`Cannot save familymember.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/familymembers/{_id}`,

    config: {
      validate: {

        params: {
          _id: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        mode: `try`
      }
    },

    handler: (req, res) => {

      /* TODO enkel familie kan familiemembers verwijderen */

      const {_id} = req.params;
      const query = {_id: _id};
      const data = {isActive: false};
      const update = {new: true};

      FamilyMember.findOneAndUpdate(query, data, update)
        .then(u => {
          if (!u) return res(Boom.badRequest(`Cannot delete familymember.`));
          u = omit(u.toJSON(), [`__v`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`Cannot delete familymember.`)));

    }
  }


];
