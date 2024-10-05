import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type = 'button', className = '' }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${className} px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 active:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 `}
        >
            {children}
        </button>
    );
};

export default Button;