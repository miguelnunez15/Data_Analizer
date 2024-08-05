
interface ButtonProps {
    type?: string;
    text?: string | undefined;
    icono?: string | undefined;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    datakey?: string | number;
}

const Button: React.FC<ButtonProps> = ({ type = 'primary', text = null, icono = null, onClick, datakey = null }) => {

    return (
        <button type="button" className={`btn btn-${type} flex gap-2`} onClick={onClick} data-key={datakey}>
            {icono && <i className={`bi ${icono}`}></i>}
            {text && <span className="w-full text-center">{text}</span>}
        </button>
    )
}

export default Button;