import { HTMLProps } from "react";

export default interface IModalForm {
    title: string | undefined;
    fnToExecute: (input:string) => any;
    isActive: boolean | undefined;
}
