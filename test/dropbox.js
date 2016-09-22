import { expect } from 'chai';
import FileController from '../dropbox/dropbox';
import fs from 'fs';
import path from 'path';

describe('dropbox', () => {

	let controller = new FileController('8pR1Xr-gXoAAAAAAAAAADW6vx6dRX-_HqrHAneDNK4H8PE5awKTokQqLT4txX62Y');

	before((done) => {

		let p1 = controller.remove({ path: '/test/package.json' });
		let p2 = controller.remove({ path: '/test/test.txt' });

		Promise.all([p1, p2]).then(() => {

			done();

		}).catch(() => {

			done();

		});

	});

	describe('#listFolder()', () => {

		it('should return files', (done) => {
			
			controller.listFolder({ path: '/test' })
				.then((data) => {

					expect(data.entries).to.be.an('array')
						.and.to.have.deep.property('[0].name', 'dropbox.js');

					done();

				})
				.catch((error) => {

					done(error);

				});

		});

	});

	describe('#download()', () => {

		it('should return name of downloaded file', (done) => {

			controller.download({ path: '/test/dropbox.js' })
				.then((data) => {

					expect(data.name).to.be.equal('dropbox.js');
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

	});

	describe('#upload()', () => {

		it('should return name of uploaded file', (done) => {

			fs.readFile(path.join(__dirname, '../package.json'), 'utf8', (err, contents) => {

				if (err) {
			
					done(err);
			
				}
			
				controller.upload({ path: '/test/package.json', contents })
					.then((data) => {
			
						expect(data.name).to.be.equal('package.json');
						done();
			
					})
					.catch((error) => {
			
						done(error);
			
					});
			
			});

		});
		
		it('should create empty file', (done) => {

			controller.upload({ path: '/test/test.txt' })
				.then((data) => {

					expect(data.name).to.be.equal('test.txt');
					done();

				})
				.catch((error) => {

					done(error);

				});
			
		});

	});

	describe('#update()', () => {

		it('should return name of updated file', (done) => {

			controller.update({ path: '/test/test.txt', contents: 'Hello, world!' })
				.then((data) => {

					expect(data).to.have.property('name', 'test.txt');
					expect(data).to.have.property('size', 13);
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

	});

	describe('#remove()', () => {

		it('should return name of deleted file', (done) => {

			controller.remove({ path: '/test/package.json' })
				.then((data) => {

					expect(data.name).to.be.equal('package.json');
					done();
			
				})
				.catch((error) => {

					done(error);
			
				});

		});

	});

});
