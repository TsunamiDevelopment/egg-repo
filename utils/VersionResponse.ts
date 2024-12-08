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