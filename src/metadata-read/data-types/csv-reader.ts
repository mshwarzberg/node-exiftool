import { type ExifUtil, execAsync, execSync } from '../../exif-utils';
import { CSVType } from '../../core/abstract';
import { DataType } from '../../core/types';
import MetadataReader from '../metadata-reader';

export default class CSVReader extends MetadataReader {
	/**
     * @param exifUtil - An instance of the {@link ExifUtil} class, used for handling file paths.
     * @param properties an optional array of properties. If it's undefined all properties will be read
     */
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.CSV);
	}

	/**
     * @override {@link ExecutableCommand.executeAsync}
     * @returns A {@link Promise} that resolves with csv of the exif data or one with an error message
     */
	async executeAsync(): Promise<string> {
		try {
			const result = await execAsync(this.getCMD());
			return result.stdout;
		} catch (error: unknown) {
			return CSVType.getError(error);
		}
	}

	/**
     * @override {@link MetadataReader.executeSync}
     * @returns csv of the exif data or one with an error message
     */
	executeSync(): string {
		try {
			return execSync(this.getCMD()).toString();
		} catch (error: unknown) {
			return CSVType.getError(error);
		}
	}
}
