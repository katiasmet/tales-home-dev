const Schema = require(`mongoose`).Schema;

const Scopes = require(`../const/Scopes`);

const schema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    bcrypt: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  organisation: {
    type: String
  },

  scope: {
    type: String,
    default: Scopes.PROFESSIONAL
  },

  firstLogin: {
    type: Boolean,
    default: true
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {

  timestamps: {
    createdAt: `created`,
    updatedAt: `modified`
  }

});

schema.plugin(require(`mongoose-bcrypt`));

module.exports = {schema};
