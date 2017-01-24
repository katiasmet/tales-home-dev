const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  professionalId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  origins: {
    type: String
  },

  homeLocation: {
    type: String
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
