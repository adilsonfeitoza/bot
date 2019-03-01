export default (sequelize, DataType) => {
  const messages = sequelize.define('messages', {
    id: {
      type: DataType.STRING,
      primaryKey: true,
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
  }, {
    hooks: {
      /* eslint no-param-reassign: "error" */
      beforeCreate: (message) => {
        const newMessage = message
        newMessage.id = message.to
      },
    },
  })
  return messages
}
