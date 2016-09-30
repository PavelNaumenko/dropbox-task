import { expect } from 'chai';
import mongoose from 'mongoose';
import config from 'config';
import fileController from '../controller/fileController';
import fs from 'fs';
import path from 'path';

describe('fileController', () => {

	let fileId;
	let file2Id;
	let file3Id;
	let file4Id;

	before((done) => {

		mongoose.connect(config.DATABASE, (error) => {

			if (error) {

				done(error);

			} else {

				console.log('//        Connected to API db        //');
				done();

			}

		});

	});

	after((done) => {

		let p2 = fileController.deleteFile({ path: `/test/${file2Id}` });
		let p3 = fileController.deleteFile({ path: `/test/${file3Id}` });
		let p4 = fileController.deleteFile({ path: `/test/${file4Id}` });
		let p5 = fileController.deleteFolder({ path: '/test2' });

		Promise.all([p2, p3, p4, p5])
			.then(() => {

				done();

			})
			.catch(() => {

				done();

			});

	});

	describe('#createFile', () => {

		it('should create file and return a name of user file', (done) => {

			fileController.createFile({ path: '/test/hello.txt', contents: 'Hello, world!' })
				.then((data) => {

					fileId = data.file.name;
					expect(data.file).to.have.property('size', 13);
					expect(data).to.have.property('customName', 'hello.txt');
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

		it('should save object to db', (done) => {

			fileController.findOne({ uuid: fileId })
				.then((data) => {

					expect(data.name).to.be.equal('hello.txt');
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

		it('should create object with some name', (done) => {

			fileController.createFile({ path: '/test/hello.txt', contents: 'Hello, world - 2!' })
				.then((data) => {

					file2Id = data.file.name;
					expect(data.file).to.have.property('size', 17);
					expect(data).to.have.property('customName', 'hello.txt');
					expect(fileId).to.not.equal(file2Id);
					done();

				})
				.catch((error) => {

					done(error);

				});

		});
		
		it('should create image object', (done) => {

			fs.readFile(path.join(__dirname, './assets/trolltunga.jpg'), (error, data) => {
			
				if (error) {
			
					done(error);
			
				}
			
				fileController.createFile({ path: '/test/trolltunga.jpg', contents: data })
					.then((data) => {

						file3Id = data.file.name;
						expect(data.file).to.have.property('size', 45941);
						expect(data).to.have.property('customName', 'trolltunga.jpg');
						done();
			
					})
					.catch((error) => {
			
						done(error);
			
					});
			
			});
			
		});

		it('should create pdf object', (done) => {

			fs.readFile(path.join(__dirname, './assets/work begin.pdf'), (error, data) => {

				if (error) {

					done(error);

				}

				fileController.createFile({ path: '/test/work begin.pdf', contents: data })
					.then((data) => {

						file4Id = data.file.name;
						expect(data.file).to.have.property('size', 1197735);
						expect(data).to.have.property('customName', 'work begin.pdf');
						done();

					})
					.catch((error) => {

						done(error);

					});

			});

		});

	});

	describe('#listFolder', () => {

		let list;

		it('should return the consist list from folder', (done) => {

			fileController.listFolder({ path: '/test' })
				.then((data) => {

					list = data;
					expect(data).to.be.an('array');
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

		it('should return custom name', (done) => {

			let customName;

			list.forEach((item) => {

				(item.file.name == fileId) ? customName = item.customName : true;

			});

			expect(customName).to.be.equal('hello.txt');

			done();

		});

	});
	
	describe('#downloadFile', () => {
		
		it('should return downloaded file', (done) => {
			
			fileController.downloadFile({ path: `/test/${fileId}` })
				.then((data) => {
					
					expect(data.file).to.have.property('fileBinary', 'Hello, world!');
					expect(data).to.have.property('customName', 'hello.txt');
					done();
					
				})
				.catch((error) => {

					done(error);

				});
			
		});
		
		it('should return image file binary', (done) => {

			fileController.downloadFile({ path: `/test/${file3Id}` })
				.then((data) => {

					expect(data.file).to.have.property('fileBinary');
					expect(data).to.have.property('customName', 'trolltunga.jpg');
					expect(data.file).to.have.property('size', 45941);
					done();

				})
				.catch((error) => {

					done(error);

				});
			
		});

		it('should return pdf file', (done) => {

			fileController.downloadFile({ path: `/test/${file4Id}` })
				.then((data) => {

					expect(data.file).to.have.property('fileBinary');
					expect(data).to.have.property('customName', 'work begin.pdf');
					expect(data.file).to.have.property('size', 1197735);
					done();

				})
				.catch((error) => {

					done(error);

				});

		});
		
	});
	
	describe('#updateFile', () => {
		
		it('should return updated file', (done) => {
			
			fileController.updateFile(
				{
					path: `/test/${fileId}`,
					contents: 'Hello, world! I update you!'
				})
				.then((data) => {

					expect(data.file).to.have.property('size', 27);
					expect(data).to.have.property('customName', 'hello.txt');
					done();

				})
				.catch((error) => {

					done(error);

				});
			
		});
		
	});

	describe('#deleteFile', () => {

		it('should delete file', (done) => {

			fileController.deleteFile({ path: `/test/${fileId}` })
				.then((data) => {

					expect(data).to.have.property('customName', 'hello.txt');
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

	});

	describe('#createSharedLink', () => {

		let sharedLink = 'https://www.dropbox.com/s/28bwm8cil1d8bec/work%20begin.pdf?dl=0';
		let fileLink = 'https://www.dropbox.com/s/28bwm8cil1d8bec/work%20begin.pdf?dl=1';

		it('should return shared link', (done) => {

			fileController.createSharedLink(
				{
					path: '/test/work begin.pdf',
					short_url: false
				})
				.then((data) => {

					expect(data.url).to.be.equal(sharedLink);
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

		it('should return file link', (done) => {

			fileController.createFileLink(
				{
					path: '/test/work begin.pdf',
					short_url: false
				})
				.then((data) => {

					expect(data.url).to.be.equal(fileLink);
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

	});

	describe('#createFolder', () => {

		it('should return name of created directory', (done) => {

			fileController.createFolder({ path: '/test2' })
				.then((data) => {

					expect(data.name).to.be.equal('test2');
					done();

				})
				.catch((error) => {

					done(error);

				});

		});

	});

});
