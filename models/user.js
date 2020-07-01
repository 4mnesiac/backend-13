const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: mongoose.Schema.Types.String,
    validate: {
      validator(url) {
        // eslint-disable-next-line no-useless-escape
        const regex = new RegExp('^(https?:\/{2})(([a-z0-9_-]{0,63})(([a-z0-9-]{1,128}\.)+([a-z]{2,11})))(\/(([0-9a-zA-Zа-яЁА-ЯЁ_.#%&?=-]+)?\/?)*|\/)?$');
        return regex.test(url);
      },
      message: (props) => `${props.value} is not a valid!`,
    },
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);
