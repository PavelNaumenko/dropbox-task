import Dropbox from 'dropbox';
import config from 'config';

class FileController {
	
	constructor() {

		this.dropbox = new Dropbox({ accessToken: config.dropbox.accessToken });
		
	}
	
	listFolder(arg) {

		return new Promise((resolve, reject) => {

			this.dropbox.filesListFolder(arg)
				.then((data) => {

					resolve(data);

				})
				.catch((err) => {

					reject(err);

				});

		});
		
	}

	download(arg) {

		return new Promise((resolve, reject) => {

			this.dropbox.filesDownload(arg)
				.then((data) => {

					resolve(data);

				})
				.catch((err) => {

					reject(err);

				});

		});

	}

	upload(arg) {

		return new Promise((resolve, reject) => {

			this.dropbox.filesUpload(arg)
				.then((data) => {

					resolve(data);

				})
				.catch((err) => {

					reject(err);

				});

		});

	}

	update(arg) {

		arg.mode = { '.tag': 'overwrite' };

		return this.upload(arg);

	}

	remove(arg) {

		return new Promise((resolve, reject) => {

			this.dropbox.filesDelete(arg)
				.then((data) => {

					resolve(data);

				})
				.catch((err) => {

					reject(err);

				});

		});

	}
	
}

export default new FileController();
