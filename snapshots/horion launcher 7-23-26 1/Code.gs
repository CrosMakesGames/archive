function doGet() {
	return HtmlService
		.createHtmlOutputFromFile('index')
		.setTitle('Horion Launcher')
		.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
