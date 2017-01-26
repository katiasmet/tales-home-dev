const {User} = require(`mongoose`).models;

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

  }

];
