import FileController from './dropbox';
import fs from 'fs';
import path from 'path';

let controller = new FileController('8pR1Xr-gXoAAAAAAAAAADW6vx6dRX-_HqrHAneDNK4H8PE5awKTokQqLT4txX62Y');

// controller.listFolder({ path: '' })
// 	.then((data) => {
//
// 		data.entries.forEach((files) => {
//
// 			console.log(files);
//
// 		});
//
// 	})
// 	.catch((err) => {
//
// 		console.log(err);
//
// 	});

// fs.readFile(path.join(__dirname, './test'), 'utf8', (err, contents) => {
//
// 	if (err) {
//
// 		console.log(err);
//
// 	}
//
// 	controller.upload({ path: '/test/test.txt', contents })
// 		.then((data) => {
//
// 			console.log(data);
//
// 		})
// 		.catch((err) => {
//
// 			console.log(err);
//
// 		});
//
// });

// controller.remove({ path: '/test/package.json' })
// 	.then((data) => {
//
// 		console.log(data);
//
// 	})
// 	.catch((err) => {
//
// 		console.log(err);
//
// 	});

// controller.download({ path: '/test/dropbox.js' })
// 	.then((data) => {
//
// 		console.log(data);
//
// 	})
// 	.catch((err) => {
//
// 		console.log(err);
//
// 	});

controller.upload({
	path: '/test/test.txt',
	contents: 'Hello world' })
	.then((data) => {

		console.log(data);

	})
	.catch((err) => {

		console.log(err);
        console.log(err.response.res.statusMessage);

	});

// controller.update({ path: '/test/test2.pdf', contents: 'Hello, world!' })
// 	.then((data) => {
//
// 		console.log(data);
//
// 	})
// 	.catch((error) => {
//
// 		console.log(error);
//
// 	});