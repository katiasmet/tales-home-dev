const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  professionalId: {
    type: String,
    required: true
  },

  familyModelId: {
    type: String,
    required: true,
    unique: true
  },

  result: {
    type: [Schema.Types.Mixed],
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
