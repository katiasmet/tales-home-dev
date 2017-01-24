58870b0dbd302a1c7fc3e5ff
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RpZmllZCI6IjIwMTctMDEtMjRUMDg6MDY6MzcuMjUxWiIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInNjb3BlIjoicHJvZmVzc2lvbmFsIiwiaWF0IjoxNDg1MjQ1MjA2LCJleHAiOjE0ODU4NTAwMDYsImF1ZCI6InRhbGVzLWF0LWhvbWUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Iiwic3ViIjoiNTg4NzBiMGRiZDMwMmExYzdmYzNlNWZmIn0.QZkXeOTg02aQWGLNQqxzfRegIyTtm8jFZq7_OZErZCE

{

  method: `PUT`,
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
        isActive: Joi.boolean(),
        scope: Joi.string().min(3)
      }

    }

  },

  handler: (req, res) => {

    const {_id} = req.params;
    let fields = [`name`, `email`, `password`];

    if (req.hasScope(Scopes.ADMIN)) {
      fields = [...fields, `isActive`, `scope`];
    }

    const data = pick(req.payload, fields);

    User.findOneAndUpdate({_id: _id}, data)
      .then((err, u) => {
        if (err) return res(Boom.badRequest(err));
        return res(u);
      })
      .catch(() => res(Boom.badRequest(`Cannot update user.`)));

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
        scope: [Scopes.ADMIN, Scopes.PROFESSIONAL]
      }
    },

    handler: (req, res) => {

      const {_id} = req.params;

      User.findOneAndRemove({_id: _id})
        .then(err => {
          if (err) return res(Boom.badRequest(err));
          return res({message: `User deleted successfully`});
        })
        .catch(() => res(Boom.badRequest(`Cannot delete user.`)));

    }
  },
