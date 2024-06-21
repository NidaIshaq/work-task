const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({

  disease: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease', required: true },
  dietaryGoal: { type: String, required: true },
  morningMeal: { type: String }, 
  afternoonMeal: { type: String }, 
  lateAfternoonMeal: { type: String }, 
  eveningMeal: { type: String }, 
  supplements: { type: String },
  additionalTips: { type: String } 

});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);
module.exports = DietPlan;
