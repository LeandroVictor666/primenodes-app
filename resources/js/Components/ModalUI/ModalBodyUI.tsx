
import { ReactNode } from "react";
import Style from "../../../css/styles.module.css";
export default function ModalBodyUI({ content, modaltype }: { content: string, modaltype: string }) {

    var NotificationCssClass: CSSModuleClasses[string] | undefined;
    var NotificationText: string | undefined;
    function viewNotification() {
        switch (modaltype) {
            case 'success': {
                NotificationCssClass = Style.ModalSuccess;
                NotificationText = 'Success!';
                break;
            };
            case 'failure': {
                NotificationCssClass = Style.ModalFailure;
                NotificationText = 'A Error Ocurred!';
                break;
            };
            case 'alert': {
                NotificationCssClass = Style.ModalAlert;
                NotificationText = 'Alert!';
                break;
            };
        };
    };
    viewNotification();

    return (
        <div className={Style.ModalBody}>
            <div className={`${Style.ModalNotification} ${NotificationCssClass}`}>
                <p>{NotificationText}</p>
            </div>
            <div className={Style.ModalResponse}>
                <p>{content}</p>
            </div>
        </div>

    )

}