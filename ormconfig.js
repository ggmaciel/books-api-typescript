/* eslint-disable indent */

module.exports = {
   type: 'postgres',
   host: 'localhost',
   port: 5433,
   username: 'postgres',
   password: 'docker',
   database: 'booksmart',
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
