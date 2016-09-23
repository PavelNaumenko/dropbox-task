import mongoose from 'mongoose';

let filesSchema = mongoose.Schema({

	name: {

		type: String,
		default: ''

	},

	uuid: {

		type: String,
		default: ''

	}

}, { versionKey: false });

export default mongoose.model('files', filesSchema);
