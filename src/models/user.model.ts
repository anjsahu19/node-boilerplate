import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity({ name: "user" })
export class UserModel {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column()
   email: string;

   @Column({
      nullable:true
   })
   accessToken: string;
}