/* eslint-disable indent */
console.log('Env var', process.env.DATABASE_URL)
module.exports = {
   type: 'postgres',
   url: process.env.DATABASE_URL,
   synchronize: true,
   logging: false,
   entities: [
      // 'src/models/**/*.ts'
      'dist/src/models/**/*.js'
   ],
   migrations: [
      // 'src/migration/**/*.ts'
      'dist/src/migration/**/*.js'
   ],
   subscribers: [
      'src/subscriber/**/*.ts'
   ],
   cli: {
      entitiesDir: 'src/models',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
   }
}
