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
          _id: Joi.objectId(),
          familyId: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL, Scopes.FAMILY]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;
      const {familyId} = req.query;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        FamilyMember.find({isActive, _id}, projection)
        .then(familyMember => {
          if (!familyMember) return res(Boom.notFound());
          return res({familyMember});
        })
        .catch(() => res(Boom.badRequest()));

      } else if (familyId) {

        FamilyMember.find({isActive, familyId}, projection)
        .then(familyMembers => {
          if (!familyMembers) return res(Boom.notFound());
          return res({familyMembers});
        });

      } else {

        FamilyMember.find({isActive}, projection)
        .then(familyMembers => {
          return res({familyMembers});
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
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL, Scopes.FAMILY]
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
          firstName: Joi.string().alphanum().min(2).required(),
          languages: Joi.array().items(Joi.string()).required(),
          character: Joi.string().min(3).required(),
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
      .then(familyMember => {
        if (!familyMember) return res(Boom.badRequest(`Cannot save familymember.`));
        familyMember = omit(familyMember.toJSON(), [`__v`, `isActive`]);
        return res(familyMember);
      })
      .catch(() => res(Boom.badRequest(`Cannot save familymember.`)));

    }

  },

  {

    method: `PUT`,
    path: `${base}/familymembers/{_id}`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL, Scopes.FAMILY]
      },

      validate: {

        params: {
          _id: Joi.objectId()
        },

        options: {
          abortEarly: false
        },

        payload: {
          firstName: Joi.string().alphanum().min(2),
          languages: Joi.array().items(Joi.string()),
          character: Joi.string().min(3),
          role: Joi.string().min(3).alphanum()
        }

      }

    },

    handler: (req, res) => {

      const {_id} = req.params;
      const  fields = [`firstName`, `languages`, `character`, `role`];

      let query = {_id: _id};
      if (req.hasScope(Scopes.FAMILY)) query = {_id: _id, familyId: req.getUser().sub};

      const data = pick(req.payload, fields);
      const update = {new: true};

      FamilyMember.findOneAndUpdate(query, data, update)
        .then(familymember => {
          if (!familymember) return res(Boom.badRequest(`Cannot update family member.`));
          familymember = omit(familymember.toJSON(), [`__v`, `isActive`]);
          return res(familymember);
        })
        .catch(() => res(Boom.badRequest(`Cannot update family member.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/familymembers/{_id?}`,

    config: {
      validate: {

        params: {
          _id: Joi.objectId()
        }

      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL, Scopes.FAMILY],
        mode: `try`
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;
      const {familyId} = req.query;

      let query = {_id: _id};
      if (familyId) query = {familyId: familyId};
      const data = {isActive: false};
      const update = {new: true};

      if (familyId) {

        FamilyMember.update(query, {$set: data}, {multi: true})
          .then(familymembers => {
            console.log(familymembers);
            if (!familymembers) return res(Boom.badRequest(`Cannot delete familymembers.`));
            return res(`Successfully deleted familymembers.`);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete familymembers.`)));

      } else {

        FamilyMember.findOneAndUpdate(query, data, update)
          .then(familyMember => {
            if (!familyMember) return res(Boom.badRequest(`Cannot delete familymember.`));
            familyMember = omit(familyMember.toJSON(), [`__v`]);
            return res(familyMember);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete familymember.`)));

      }

    }
  }


];
