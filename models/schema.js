const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },

    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise is Required",
            },
            name: {
                type: String,
                trim: true,
                required: "name is required!"
            },
            duration: {
                type: Number,
                required: "how long did you do this exercise for?"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        },
    ],
},
{
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }

);
// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
    }, 0);
  });
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
