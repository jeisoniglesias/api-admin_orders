const config = () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC || false,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    HASH_SALT: process.env.HASH_SALT,
  },

});
/* {
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNCHRONIZE || false,
  },
} ;*/

export const configModule = {
  isGlobal: true,
  load: [config],
  envFilePath: `./env/${process.env.NODE_ENV}.env`,
};
