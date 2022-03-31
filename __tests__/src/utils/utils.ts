import { removeTrailingSlash } from "../../../src/utils/util";

describe('UTILS', () => {
    describe('removeTrailingSlash function', () => {
        it('Should remove slash from the end of string', () => {
            const str = "https://example.com/"
            expect(removeTrailingSlash(str)).toEqual('https://example.com')
        })
    })
})
