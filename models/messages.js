export default (sequelize, DataType) => {
  const messages = sequelize.define('messages', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conversationId: {
      type: DataType.STRING,
    },
    timestamp: {
      type: DataType.DATE,
      validate: {
        notEmpty: true,
      },
    },
    from: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    to: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })
  return messages
}
