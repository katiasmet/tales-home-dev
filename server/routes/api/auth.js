const {User, Family} = require(`mongoose`).models;
const Scopes = require(`../../modules/mongoose/const/Scopes`);

const {omit} = require(`lodash`);

const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `POST`,
    path: `${base}/auth`,

    config: {

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          email: Joi.string().min(3).required(),
          password: Joi.string().min(3).required(),
          audience: Joi.string().min(3).required()
        }

      }

    },

    handler: (req, res) => {

      const {email, password, audience} = req.payload;
      const isActive = true;

      User.findOne({
        $and: [
          {email: email},
          {isActive}
        ]
      }).then(user => {


        if (!user) {
          return res(
            Boom.badRequest(`Oops! Looks like your e-mail or password isn't correct.`)
          );
        }

        user.verifyPassword(password, (err, isValid) => {

          if (err || !isValid) {
            return res(
              Boom.badRequest(`Oops! Looks like your e-mail or password isn't correct.`)
            );
          }

          const {_id: subject} = user;
          user = omit(user.toJSON(), [`__v`, `password`, `isActive`, `_id`, `created`]);

          return res.token(user, {subject, audience});

        });

      }).catch(() => {
        return res(
          Boom.badRequest(`Oops! Looks like we couldn't login.`)
        );
      });

    }

  },

  {

    method: `POST`,
    path: `${base}/authfamily`,

    config: {

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          familyId: Joi.string().min(3).required(),
          audience: Joi.string().min(3).required()
        }

      }

    },

    handler: (req, res) => {

      const {familyId, audience} = req.payload;
      const isActive = true;

      Family.findOne({
        $and: [
          {_id: familyId},
          {isActive}
        ]
      }).then(family => {

        if (!family) {
          return res(
            Boom.badRequest(`Oops! Looks like your family doesn't exist.`)
          );
        }

        const {_id: subject} = family;
        family = omit(family.toJSON(), [`__v`, `isActive`, `_id`]);
        family.scope = Scopes.FAMILY;

        return res.token(family, {subject, audience});

      }).catch(() => {
        return res(
          Boom.badRequest(`Oops! Looks like we couldn't login.`)
        );
      });

    }

  }

];
