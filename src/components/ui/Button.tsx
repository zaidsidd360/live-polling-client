import React from "react";

interface ButtonProps {
	text: string;
	icon?: React.ReactNode;
	className?: string;
	diabled?: boolean;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, className, onClick }) => {
	return (
		<button onClick={onClick} className={`${className}`}>
			{icon && <span className="mr-2">{icon}</span>}
			{text}
		</button>
	);
};

export default Button;
