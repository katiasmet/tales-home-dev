const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  familyId: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: true
  },

  languages: {
    type: [String],
    required: true
  },

  character: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
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

module.exports = {schema};
