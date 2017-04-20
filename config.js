var configs = {};
configs.applicationPort = (process.env.PORT)? process.env.PORT : 3000;
configs.dbName = (process.env.DB_NAME)? process.env.DB_NAME : 'CrossoverVideosAssignment';
configs.dbHost = (process.env.DB_HOST)? process.env.DB_HOST : 'localhost';

module.exports = configs;