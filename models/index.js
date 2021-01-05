const User = require("./User");
const Routine = require("./Routine");
const UserRoutine = require("./UserRoutine");

// User belongToMany Routine (through UserRoutine)
// Define the UserRoutine model as our through table. Sequelize creates a userId as foreign key.
User.belongsToMany(Routine, { through: UserRoutine });

// Routine belongToMany User (through UserRoutine).
// Define the UserRoutine model as our through table. Sequelize creates a routineId as foreign key.
Routine.belongsToMany(User, { through: UserRoutine });

// Package our models and export them as an object so we can import them together and use their proper names.
module.exports = {
  User,
  Routine,
  UserRoutine,
};
