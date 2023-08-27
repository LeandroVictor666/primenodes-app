import { ServerResponse } from "@/types/serverresponse";

export default interface IMyAccount {
    updateUsername(newUsername:string):Promise<JSON | undefined | ServerResponse >;
    updateEmail():void;
    updateDateOfBirthday():void;
}
