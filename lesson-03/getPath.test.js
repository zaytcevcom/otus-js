/**
 * @jest-environment jsdom
 */

const { getPath } = require('./getPath');

describe('getPath', () => {

    it('should return unique selector for element with id', () => {
        document.body.innerHTML = '<div id="uniqueId"></div>';
        const path = getPath(document.querySelector('#uniqueId'));

        expect(path).toBe('body div#uniqueId');
    });

    it('should return unique selector for element without id', () => {
        document.body.innerHTML = '<div><span class="test"></span><span></span></div>';
        const path = getPath(document.querySelector('.test'));

        expect(path).toBe('body div span.test:nth-child(1)');
    });

    it('should throw error for non-Element argument', () => {
        expect(() => getPath(null)).toThrow('Argument must be an HTMLElement');
        expect(() => getPath({})).toThrow('Argument must be an HTMLElement');
    });
});
