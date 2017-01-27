const {User} = require(`mongoose`).models;

const {pick, omit, isEmpty} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);
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

        params: {
          _id: Joi.objectId()
        },

        options: {
          abortEarly: false
        },

        payload: {
          name: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(3).required(),
          organisation: Joi.string().allow(``),
          isActive: Joi.boolean(),
          scope: Joi.string().min(3)
        }

      }

    },

    handler: (req, res) => {

      let fields = [`name`, `email`, `password`, `organisation`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`, `scope`];
      }

      const data = pick(req.payload, fields);
      const user = new User(data);

      user.save()
      .then(u => {
        if (!u) return res(Boom.badRequest(`Oops! `));
        u = omit(u.toJSON(), [`__v`, `password`, `isActive`]);
        return res(u);
      })
      .catch(() => res(Boom.badRequest(`Oops! Looks like we couldn't save your registration.`)));

    }

  },

  {
    //only post method hashes password
    method: `POST`,
    path: `${base}/users/{_id}`,

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
          name: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(3).required(),
          newpassword: Joi.string().min(3).allow(``),
          organisation: Joi.string().allow(``),
          audience: Joi.string().min(3).required(),
          isActive: Joi.boolean(),
          scope: Joi.string().min(3)
        }

      }

    },

    handler: (req, res) => {

      const {_id} = req.params;
      const {password, audience} = req.payload;
      const isActive = true;

      let fields;
      if (req.sameUserId(_id)) {
        fields = [`name`, `email`, `password`, `organisation`];
      }

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [`name`, `email`, `password`, `organisation` `isActive`, `scope`];
      }

      if (isEmpty(fields)) {
        return res(Boom.unauthorized());
      }

      const data = pick(req.payload, fields);
      data._id = _id;

      User.findOne({

        $and: [
            {_id: _id},
            {isActive: isActive}
        ]

      }).then(user => {
        if (!user) {
          return res(
              Boom.badRequest(`Oops! We couldn't find this user.`)
            );
        }

        user.verifyPassword(password, (err, isValid) => {

          if (err || !isValid) {
            return res(
                Boom.badRequest(`Oops! Looks like your password isn't correct.`)
              );
          }

        });

        const {newpassword} = req.payload;
        if (newpassword !== ``) data.password = newpassword;

        for (const prop in user) {
          for (const dataProp in data) {
            if (prop === dataProp) {
              if (user[prop] !== data[dataProp]) {
                user[prop] = data[dataProp];
              }
            }
          }
        }

        user.save()
        .then(u => {
          if (!u) return res(Boom.badRequest(`Oops! We couldn't update your information.`));

          const {_id: subject} = u;
          u = omit(user.toJSON(), [`__v`, `password`, `isActive`, `_id`, `created`]);

          return res.token(u, {subject, audience});
        });

      }).catch(() => {
        return res(
            Boom.badRequest(`Oops! We couldn't update your information.`)
          );
      });

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
      const query = {_id: _id};

      User.remove(query)
        .then(result => {
          if (result.writeConcernError) return res(Boom.badRequest(result.writeConcernError.errmsg));
          return res({message: `User deleted successfully.`});
        })
        .catch(() => res(Boom.badRequest(`Cannot delete user.`)));

    }
  }

];
