import React from "react";
import Card from "@mui/material/Card";

const ServiceCard = ({ title, description }) => {
	return (
		<div className="m-4">
			<Card sx={{ minWidth: 400, minHeight: 400 }}>
				<h1 className="mt-4 underline underline-offset-4">{title}</h1>
				<p>{description}</p>
			</Card>
		</div>
	);
};

export default ServiceCard;
