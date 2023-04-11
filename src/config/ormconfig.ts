
import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as dotenv from 'dotenv'
dotenv.config({path:`.${process.env.NODE_ENV}.env`})

export const config:MysqlConnectionOptions ={
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  // synchronize:true,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migration/*.js"]
}

export default new DataSource(config)