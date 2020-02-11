module.exports = (sequelize, DataType) => {
  const Tasks = sequelize.define("Tasks", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      AllowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: {
        type: DataType.BOOLEAN,
        allwNull: false,
        defaultValue: false
      }
    }
  },
  {
    classMethods: {
      associate: (models) => {
        Tasks.belongsTo(models.Users)
      }
    }
  })
  return Tasks
}
