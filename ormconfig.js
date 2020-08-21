/* eslint-disable indent */

module.exports = {
   type: 'postgres',
   url: 'postgres://postgres:docker@localhost:5433/booksmart',
   synchronize: true,
   logging: false,
   entities: [
      'src/models/**/*.ts'
      // 'dist/src/models/**/*.js'
   ],
   migrations: [
      'src/migration/**/*.ts'
      // 'dist/src/migration/**/*.js'
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
