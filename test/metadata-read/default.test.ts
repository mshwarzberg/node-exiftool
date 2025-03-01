import DefaultReader from '../../src/metadata-read/data-types/default-reader';
import { exifUtil, invalidTestPath, testPath } from '../values';

describe('tests the the default format output reader', () => {
	const errorRegex = /^error: [\s\S]*?\r\nstack: [\s\S]*?/;
	let defaultReader: DefaultReader;
	it('should read the default synchronously', () => {
		defaultReader = exifUtil.defaultReader();
		const pngResult = defaultReader.executeSync();
		expect(pngResult.match(errorRegex)).not.toBeTruthy();
	});

	it('should read the default asynchronously', async () => {
		defaultReader = exifUtil.defaultReader();
		const pngResult = await defaultReader.executeAsync();
		expect(pngResult.match(errorRegex)).not.toBeTruthy();
	});

	it('should fail to read the default synchronously', () => {
		defaultReader = exifUtil.defaultReader();
		exifUtil.setPaths(invalidTestPath);
		const pngResult = defaultReader.executeSync();
		expect(pngResult.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});

	it('should fail to read the default asynchronously', async () => {
		defaultReader = exifUtil.defaultReader();
		exifUtil.setPaths(invalidTestPath);
		const pngResult = await defaultReader.executeAsync();
		expect(pngResult.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});
});
