// THIS IS AN EXAMPLE. YOU MIGHT BE ABLE TO USE TYPESCRIPT IN THIS REPO, BUT IT IS NOT GUARANTEED.
// THIS FILE IS NOT USED IN THE REPO, IT IS JUST AN EXAMPLE. THIS IS WHAT YOU SHOULD RETURN FROM
// YOUR INSTALLER. USE THE PAPER INSTALLER AS AN EXAMPLE.

export default interface VersionResponse {
	sdk: {
		type: string,
		version: string
	},
	program: {
		eulaMsg: string | undefined,
		eulaFile: string | undefined
	},
	launch: string
}