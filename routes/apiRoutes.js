const db = require("../models");
require("mongoose");

module.exports = function(app){

    // use app.get to find all workouts in range
    app.get("/api/workouts/range", (_req, res) => {
        db.Workout
        .find({})
        .sort({ id: -1 })
        .limit(7)
        .then(workoutData =>{
        res.json(workoutData);
        })
            .catch(err => {
            res.json(err);
          });
      });
    


    // use app.get to find the last workout added
    app.get("/api/workouts/", (req, res) => {
        db.Workout
        .find({})
        .then(workoutData =>{
        res.json(workoutData);
        })
            .catch(err => {
            res.json(err);
          });
      });

    // use app.post to create a workout
    app.post("/api/workouts/", (req, res) => {
        db.Workout.create({})
          .then(workoutData => {
            res.json(workoutData);
          })
          .catch(err => {
            res.json(err);
          });
      });


   // use app.put to add an exercise and update a workout
    app.put("/api/workouts/:id", (req, res) => {db.Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: 
        { exercises: req.body }},
      {
        new: true,
        runValidators: true,
      })
      .then((workoutData) => {res.json(workoutData);
      }).catch(err => {
        res.json(err);
      });
    });
  };