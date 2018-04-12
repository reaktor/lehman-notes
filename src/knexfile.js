module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { user: 'lehman', password: '123', database: 'notes' },
  pool: { min: 0, max: 7 }
};
