import {
    Document,
    model,
    Schema,
    PassportLocalModel,
    PassportLocalDocument,
    PassportLocalSchema,
    PassportLocalOptions,
    PassportLocalErrorMessages,
    SchemaTypes,
    SchemaType

} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose';
// export the interace IregisterProps which provides the types for the props fiven to Register
type ObjectId = typeof SchemaTypes.ObjectId;

interface IContact {
    contact: ObjectId;
    conversationId: ObjectId;
}

export interface IRegisterProps extends Document, PassportLocalDocument{
    email:string;
    password:string;
    attempts:number;
}
// creates the schema for the db
const registerSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    attempts:Number,
});
//create the options object and fills the required fields
let options: PassportLocalOptions = <PassportLocalOptions>{};
options.usernameField='email';
options.usernameUnique=true;
options.limitAttempts = true;
options.maxAttempts = 5;
// creates the variable to show the error messsages of tyhe type PassportLocalErrorMessages
let errorMessages: PassportLocalErrorMessages={};
errorMessages.IncorrectPasswordError = 'wrong password'
options.errorMessages= errorMessages;
// adds the schema to the passport
registerSchema.plugin(passportLocalMongoose, options);
// required sentence to add typings to usermodel
interface UserModel<T extends Document> extends PassportLocalModel<T> {}
export default model<IRegisterProps>("users", registerSchema) as UserModel<IRegisterProps>;