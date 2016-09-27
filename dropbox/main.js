import controller from './dropbox';
import fs from 'fs';
import path from 'path';

// controller.listFolder({ path: '' })
// 	.then((data) => {
//
// 		console.log(data);
// 		// data.entries.forEach((files) => {
//         //
// 		// 	console.log(files);
//         //
// 		// });
//
// 	})
// 	.catch((err) => {
//
// 		console.log(err);
//
// 	});

// fs.readFile(path.join(__dirname, './work begin.pdf'), (err, data) => {
//
// 	if (err) {
//
// 		console.log(err);
//
// 	}
//
// 	controller.upload({ path: '/test/work begin.pdf', contents: data })
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

controller.download({ path: '/test/work begin.pdf' })
	.then((data) => {

		console.log(data.fileBinary);
		fs.writeFile(path.join(__dirname, './work begin2.pdf'), data.fileBinary, 'binary', (err, data) => {

			err ? console.log(err) : console.log(data);

		});

	})
	.catch((err) => {

		console.log(err);

	});

// controller.upload({
// 	path: '/file.txt',
// 	contents: 'Hello world' })
// 	.then((data) => {
//
// 		console.log(data);
//
// 	})
// 	.catch((err) => {
//
// 		console.log(err);
//         console.log(err.response.res.statusMessage);
//
// 	});

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