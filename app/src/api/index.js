const baseApiUrl = "https://private-repo.onrender.com/";

export const queryContactForm = async (
	firstName,
	lastName,
	email,
	contactNumber,
	description,
	serviceSelected
) => {
	const response = await fetch(`${baseApiUrl}sendGrid/contact`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			firstName,
			lastName,
			email,
			contactNumber,
			description,
			serviceSelected,
		}),
	});

	return response.json();
};
