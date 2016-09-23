import fileSchema from '../shemas/fileSchema';

export default class dbDriver {

	constructor(shema) {

		switch (shema) {

			case 'fileSchema':
				this.model = fileSchema;
				break;

			default:
				console.log('Incorrect model!');


		}

	}

	create(data) {

		return new Promise((resolve, reject) => {

			this.model.create(data, (err, data) => {

				(err) ? reject(err) : resolve(data);

			});

		});

	}

	findOne(criteria) {

		return new Promise((resolve, reject) => {

			this.model.findOne(criteria, (err, data) => {

				(err) ? reject(err) : resolve(data);

			});

		});
		
	}

	deleteOne(criteria) {
		
		return new Promise((resolve, reject) => {
			
			this.model.findOneAndRemove(criteria, (err, data) => {
				
				(err) ? reject(err) : resolve(data);
				
			});
			
		});
		
	}

}
