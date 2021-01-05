const router = require("express").Router();
const { Workout } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const workoutDelete = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutDelete) {
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }

    res.status(200).json(workoutDelete);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateWorkout = await Workout.update(
      {
      ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updateWorkout) {
      // Client error response 404 - Not found
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }
    // Sucess response 200 - OK
    res.status(200).json(updateWorkout);
  } catch (err) {
    // Client error response 400 - Bad request
    res.status(400).json(err.message);
  }
});

module.exports = router;
