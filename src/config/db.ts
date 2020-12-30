import { UserModel } from "@models/user.model"
import { join } from "path"
import { Connection, createConnection } from "typeorm"

class MySqlDB {
   private static _singleton: boolean = true
   private static _instance: MySqlDB
   public connection: Connection
   public models: any = {}
   constructor() {
     if (MySqlDB._singleton) {
       throw new SyntaxError(
         'This is a singleton class. Please use MySqlDB.instance instead!'
       )
     }
   }
 
   public static get instance(): MySqlDB {
     if (!this._instance) {
       this._singleton = false
       this._instance = new MySqlDB()
       this._singleton = true
     }
     return this._instance
   }

   public async setMysqlConfig() {
     const entity = "../models/**/*.model.ts"
      try {
         this.connection = await createConnection({
          type: "mysql",
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [
            UserModel
          ],
          synchronize: true,
          logging: true
      });
        if (this.connection.isConnected) {
          console.log(`Connection has been established to ${this.connection.options.database} DB successfully.`)
        }
         
      } catch (error) {
         console.error('Unable to connect to the database:', error)
      }
      
   }
}

export default MySqlDB.instance