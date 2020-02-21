module.exports = (sequelize, DataType) => {
 const Genres = sequelize.define("Genres", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
   description: {
      type: DataType.STRING,
      AllowNull: false,
      validate: {
        notEmpty: true
      }
   }
 })
 return Genres
}
