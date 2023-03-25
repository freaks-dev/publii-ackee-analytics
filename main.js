class AckeeAnalyticsIntegrationPlugin {
	constructor (API, name, config) {
		this.API = API;
		this.name = name;
		this.config = config;
	}

	addInsertions () {
		this.API.addInsertion('publiiHead', this.addHeadCode, 1, this);
	}

	addHeadCode (rendererInstance) {
		let scriptToLoad = '';
		let cookieBannerGroup = 'text/javascript';
		let dataAckeeServerURL = `data-ackee-server="${this.config.dataAckeeServerURL}"`;

		if (!this.config.dataAckeeServerURL) {
			dataAckeeServerURL = this.config.dataAckeeServerURL;
		}

		if (this.config.cookieBannerIntegration) {
			cookieBannerGroup = 'gdpr-blocker/' + this.config.cookieBannerGroup.trim();
		}

		if (!rendererInstance.previewMode || this.config.previewMode) {
			scriptToLoad = `
				<script 
				   async
					type="${cookieBannerGroup}" 
					src="${this.config.dataHost}"
                    ${dataAckeeServerURL}
					data-ackee-domain-id="${this.config.dataDomainID}">
                </script>
			`;
		}

		return scriptToLoad;
	}
}

module.exports = AckeeAnalyticsIntegrationPlugin;