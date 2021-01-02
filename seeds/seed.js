const sequelize = require ("../config/connection");
const { User, Routine, Exercise } = require ("../models");

const userData = require ("./userData.json");
const routineData = require ("./routineData.json");
const exerciseData = require ("./exerciseData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true});
  console.log("----- DATABASE SYNCED -----");
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("----- USER SEEDED -----");
  await Routine.bulkCreate(routineData);
  console.log("----- ROUTINE SEEDED -----");
  await Exercise.bulkCreate(exerciseData);
  console.log("----- EXERCISE SEEDED -----");

  process.exit(0);
};

seedDatabase();