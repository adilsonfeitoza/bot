export default {
  database: 'bot',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_bot.sqlite`,
    define: {
      underscored: true,
      timestamps: false,
    },
  },
  jwtSecret: 'bot',
  jwtSession: { session: false },
}
