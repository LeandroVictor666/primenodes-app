export default function ModalHeaderUI({title} : {title:string | undefined}) {
    return (
        <header>
            <p>{title}</p>
        </header>
    );
};