const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  professionalId: {
    type: String,
    required: true,
    unique: true
  },

  familyModelId: {
    type: String,
    required: true,
    unique: true
  },

  notes: {
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
