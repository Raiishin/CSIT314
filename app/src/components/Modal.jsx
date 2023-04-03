import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, DialogActions, DialogTitle, Dialog, Button } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export const Modal = ({ children, setVisibility, isModalVisible, modalTitle }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(isModalVisible);
	}, [isModalVisible, setIsVisible, setVisibility]);

	const handleClose = () => {
		setVisibility(false);
	};

	return (
		<div>
			{isVisible && (
				<div>
					<BootstrapDialog onClose={handleClose} open={isVisible} className="p-12">
						<BootstrapDialogTitle onClose={handleClose}>{modalTitle}</BootstrapDialogTitle>
						{children}
						<DialogActions>
							<Button autoFocus onClick={handleClose}>
								Ok
							</Button>
						</DialogActions>
					</BootstrapDialog>
				</div>
			)}
		</div>
	);
};
