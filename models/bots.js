export default (sequelize, DataType) => {
  const bots = sequelize.define('bots', {
    id: {
      type: DataType.STRING,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })

  return bots
}
