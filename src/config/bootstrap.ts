// import {UserModel} from "../models/user.model";
// import Auth from './auth';
export default class Bootstrap {
    public static async init() {
        console.log("Bootstrap");
        // const users = Auth.users();

        // for(const objUser of users) {
        //     let user = await UserModel.findOne({where: {email: objUser.email}});
        //     if(!user){
        //         user = await UserModel.create(objUser)
        //     }
        // }
    }
}