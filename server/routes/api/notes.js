const {Note} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {
    method: `GET`,
    path: `${base}/notes/{_id?}`,

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
      const {familyModelId, professionalId} = req.query;
      const isActive = true;
      const projection = `-__v -isActive`;

      if (_id) {

        Note.find({_id, isActive}, projection)
        .then(note => {
          if (!note) return res(Boom.notFound());
          return res({note});
        })
        .catch(() => res(Boom.badRequest()));

      } else if (familyModelId) {

        Note.find({familyModelId, isActive}, projection)
        .then(note => {
          if (!note) return res(Boom.notFound());
          return res({note});
        })
        .catch(() => res(Boom.badRequest()));

      } else if (professionalId) {

        Note.find({professionalId, isActive}, projection)
        .then(notes => {
          if (!notes) return res(Boom.notFound());
          return res({notes});
        })
        .catch(() => res(Boom.badRequest()));

      } else {

        Note.find({isActive}, projection)
        .then(notes => {
          return res({notes});
        });

      }

    }
  },

  {

    method: `POST`,
    path: `${base}/notes`,

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
          familyModelId: Joi.string().alphanum().min(3).required(),
          notes: Joi.string().allow(``),
          isActive: Joi.boolean()
        }

      }

    },

    handler: (req, res) => {

      let fields = [`familyModelId`, `notes`];

      if (req.hasScope(Scopes.ADMIN)) {
        fields = [...fields, `isActive`];
      }

      const data = pick(req.payload, fields);
      data.professionalId = req.getUser().sub;
      const note = new Note(data);

      note.save()
      .then(note => {
        if (!note) return res(Boom.badRequest(`Cannot save note.`));
        note = omit(note.toJSON(), [`__v`, `isActive`]);
        return res(note);
      })
      .catch(() => res(Boom.badRequest(`Cannot save note.`)));

    }

  },

  {

    method: `PUT`,
    path: `${base}/notes/{_id}`,

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
          notes: Joi.string().allow(``)
        }

      }

    },

    handler: (req, res) => {

      const {_id} = req.params;
      const  fields = [`notes`];

      let query = {_id: _id};
      if (req.hasScope(Scopes.PROFESSIONAL)) query = {_id: _id, professionalId: req.getUser().sub};

      const data = pick(req.payload, fields);
      const update = {new: true};

      Note.findOneAndUpdate(query, data, update)
        .then(note => {
          if (!note) return res(Boom.badRequest(`Cannot update note.`));
          note = omit(note.toJSON(), [`__v`, `isActive`]);
          return res(note);
        })
        .catch(() => res(Boom.badRequest(`Cannot update note.`)));

    }

  },

  {
    method: `DELETE`,
    path: `${base}/notes/{_id?}`,

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

      let query = {_id: _id};
      if (req.hasScope(Scopes.PROFESSIONAL)) query = {professionalId: req.getUser().sub};

      const data = {isActive: false};
      const update = {new: true};

      if (req.hasScope(Scopes.PROFESSIONAL)) {

        Note.update(query, {$set: data}, {multi: true})
          .then(notes => {
            if (!notes) return res(Boom.badRequest(`Cannot delete notes.`));
            return res(`Successfully deleted notes.`);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete notes.`)));

      } else {

        Note.findOneAndUpdate(query, data, update)
          .then(note => {
            if (!note) return res(Boom.badRequest(`Cannot delete note.`));
            note = omit(note.toJSON(), [`__v`]);
            return res(note);
          })
          .catch(() => res(Boom.badRequest(`Cannot delete note.`)));

      }
    }

  }

];
