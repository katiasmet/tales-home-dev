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
          name: Joi.string().alphanum().min(3).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(3).required(),
          organisation: Joi.string().min(3),
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
        if (!u) return res(Boom.badRequest(`Cannot save user.`));
        u = omit(u.toJSON(), [`__v`, `password`, `isActive`]);
        return res(u);
      })
      .catch(() => res(Boom.badRequest(`Cannot save user.`)));

    }

  },

  {

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
          name: Joi.string().alphanum().min(3).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(3).required(),
          newpassword: Joi.string().min(3),
          organisation: Joi.string().min(3),
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
              Boom.badRequest(`user/password combination incorrect`)
            );
        }

        user.verifyPassword(password, (err, isValid) => {

          if (err || !isValid) {
            return res(
                Boom.badRequest(`user/password combination incorrect`)
              );
          }

        });

        const {newpassword} = req.payload;
        if (newpassword) data.password = newpassword;

        console.log(user);

        /*for (const [key, value] of Object.entries(user)) {
          console.log(`hello`);
          for (const [dataKey, newValue] of Object.entries(data)) {
            if (key === dataKey) {
              console.log(key);
              if (value !== newValue) {
                console.log(value);
                user[key] = newValue;
              }
            }
          }
        }*/

        for (const prop in user) {
          for (const dataProp in data) {
            if (prop === dataProp) {
              if (user[prop] !== data[dataProp]) {
                console.log(`difference`);
                user[prop] = data[dataProp];
              }
            }
          }
        }

        console.log(user);

        user.save()
        .then(u => {
          if (!u) return res(Boom.badRequest(`Cannot update user.`));

          const {_id: subject} = u;
          u = omit(user.toJSON(), [`__v`, `password`, `isActive`, `_id`, `created`]);

          return res.token(u, {subject, audience});
        });

      }).catch(() => {
        return res(
            Boom.badRequest(`Error while updating user.`)
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
          return res({message: `User deleted successfully`});
        })
        .catch(() => res(Boom.badRequest(`Cannot delete user.`)));

    }
  }

];
