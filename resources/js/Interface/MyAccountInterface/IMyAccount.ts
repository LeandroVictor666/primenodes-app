import { ServerResponse } from "@/types/serverresponse";

export default interface IMyAccount {
    updateUsername(newUsername: string): Promise<ServerResponse | undefined>;
    updateEmail(): void;
    updateDateOfBirthday(): void;
}
