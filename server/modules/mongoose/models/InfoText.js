const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  page: {
    type: String,
    required: true,
    unique: true
  },

  description: {
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
