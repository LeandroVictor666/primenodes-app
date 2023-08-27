import { ServerResponse } from "@/types/serverresponse";

export default interface IMyAccount {
    //#region Update-Account-Informations-Methods
    updateUsername(newUsername: string): Promise<ServerResponse | undefined>;
    updateEmail(newEmail: string): Promise<ServerResponse | undefined>
    updateDateOfBirthday(): void;
    //#endregion
}
