const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory');

// const Owner = sequelize.define('owner', {
//     name: {
//         type: DataTypes.STRING
//     },
//     contactNumber: {
//         type: DataTypes.STRING
//     },
//     address: {
//         type: DataTypes.STRING
//     }
// },
// {
//     tableName: "owner"
// });

const Kitten = sequelize.define('kitten', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuteness: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  tableName: 'kitten',
});

// Owner.hasMany(Kitten);

// Kitten.belongsTo(Owner);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync({
      force: true,
    });
  }).catch((error) => console.error('Unable to connect to the database:', error));

// Kitten.create({full_name: "Mittens", age: 12, cuteness: 8, breed: "Tabby"});

module.exports = {
  // owner: Owner,
  kitten: Kitten,
};
