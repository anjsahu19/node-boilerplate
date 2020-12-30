import { Request, Response, NextFunction } from "express";

export class MainController {
   public static index = async(req: Request, res: Response, next: NextFunction) =>{
      try {
          res.success({data:`Welcome to Node Server.`});
        } catch (err) {
          let error = `${err.name} : ${err.message}`
          res.failure({ "message": error })
        }
  }
}