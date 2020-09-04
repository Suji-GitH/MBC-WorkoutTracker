const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    exercises: [{
        type: {
          type: String,
          trim: true
        },
        name: {
          type: String,
          trim: true
        },
        duration: {
          type: Number
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number,
          min: 1
        },
        sets: {
          type: Number,
          min: 1
        },
        distance: {
          type: Number
        }
      }],
      day: {
        type: Date,
        default: Date.now
        }   
  },
  
  {
    // adds a virtual property field
    toJSON: {
    virtuals: true,
    },
  }
  );
  
  // Creates a virtual property field `total duration
  WorkoutsSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
  }, 0)
    
  });

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;