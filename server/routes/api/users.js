const {User} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/users/{_id?}`,

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
      const projection = `-password -__v -isActive`;

      if (_id) {

        User.find({isActive, _id}, projection)
        .then(user => {
          if (!user) return res(Boom.notFound());
          return res({user});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        User.find({isActive}, projection) //uit resultaten halen
        .then(users => {
          return res({users});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/users`,

    config: {

      auth: {
        strategy: `token`,
        mode: `try` /* mode: optional, same as try, but fails on invalid token */
      },

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          name: Joi.string().alphanum().min(3).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(3).required(),
          isActive: Joi.boolean(),
          scope: Joi.string().min(3)
        }

      }

    },

    handler: (req, res) => {

      let fields = [`name`, `email`, `password`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`, `scope`];
      }

      const data = pick(req.payload, fields);
      const user = new User(data);

      console.log(user);

      user.save()
      .then(u => {
        if (!u) return res(Boom.badRequest(`cannot save user`));
        u = omit(u.toJSON(), [`__v`, `password`, `isActive`]);
        return res(u);
      })
      .catch(() => res(Boom.badRequest(`cannot save user`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/users/{_id}`,

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

      User.remove({_id: _id})
        .then(err => {
          if (err) return res(Boom.badRequest(err));
          return res({message: `User deleted successfully`});
        })
        .catch(() => res(Boom.badRequest(`Cannot delete user.`)));

    }
  },

];
