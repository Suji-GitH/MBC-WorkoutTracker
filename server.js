const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

//html Routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
})

//API routes
app.post("/api/workouts", ({ body }, res) => {
    console.log("create workout");
    db.workouts.create(body)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
        console.log(dbWorkouts);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

app.get("/api/workouts", (req, res) => {
    console.log("latest workout");
    db.workouts.find({})
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
    console.log("Adding an exercise")
    db.workouts.findByIdAndUpdate(
      req.params.id,
      { $push: {exercises: req.body}},
      { new: true}
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.workouts.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

