var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  age: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
mongoose.model('User', UserSchema);

// Validation
// UserSchema.path('name').required(true, "Name field is required");