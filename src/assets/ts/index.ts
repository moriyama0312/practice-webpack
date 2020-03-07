import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Test from './modules/test/index';

window.addEventListener('load', () => {
	const test = new Test();
	test.init();
});