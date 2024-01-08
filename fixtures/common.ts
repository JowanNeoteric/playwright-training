export const common = {
	selectors: {
		generic: {
		},
		buttons: {
		},
		sections: {
		},
	},
	attribute: {
		type: "type",
		id: "id",
		href: "href",
		value: {
			text: "text",
			email: "userEmail",
			currentAddress: "currentAddress"
		}
	},
	input: {
		test: {
			name: "test name",
			email: "test.email@test.com",
			address: "test address",
			permanent: "permanent test address"
		}
	},
	text: {
		welcomeMessage: "Please select an item from left to start practice.",
		demopage: "DEMOQA",
		textBox: {
			email: "Email",
			fullName: "Full Name",
			exampleEmail: "name@example.com",
			currentAddress: "Current Address",
			permanentAddress: "Permanent Address",
			submit: "Submit"
		},
		sections: {
			elements: "Elements",
			textBox: "Text Box",
			checkBox: "Check Box",
			radioButton: "Radio Button",
			webTables: "Web Tables",
			buttons: "Buttons",
			links: "Links",
			brokenLinksImages: "Broken Links - Images",
			uploadNDownload: "Upload and Download",
			dynamicProperties: "Dynamic Properties"
		},
		statuses: {
			created: "Created",
			noContent: "No Content",
			moved: "Moved",
			badRequest: "Bad Request",
			unauthorized: "Unauthorized",
			forbidden: "Forbidden",
			notFound: "Not Found"
		},
		responses: {
			201: "Link has responded with staus 201 and status text Created",
			204: "Link has responded with staus 204 and status text No Content",
			301: "Link has responded with staus 301 and status text Moved Permanently",
			400: "Link has responded with staus 400 and status text Bad Request",
			401: "Link has responded with staus 401 and status text Unauthorized",
			403: "Link has responded with staus 403 and status text Forbidden",
			404: "Link has responded with staus 404 and status text Not Found"
		}
	},
	url: {
		elements: "https://demoqa.com/elements",
		valid: "http://demoqa.com",
		invalid: "http://the-internet.herokuapp.com/status_codes/500",
	}
};
