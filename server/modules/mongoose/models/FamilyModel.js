const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  modelId: {
    type: String,
    required: true
  },

  familyId: {
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

schema.plugin(require(`mongoose-bcrypt`));

module.exports = {schema};
