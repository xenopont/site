import sinon, { SinonSpy } from 'sinon'
import should from 'should' // eslint-disable-line no-unused-vars

describe('Dummy test case', async (): Promise<void> => {
    it('Should do nothing asynchronously', async (): Promise<void> => {
        const spy: SinonSpy<any, any> = sinon.spy()
        const arg: string = 'hello world'
        spy(arg)
        sinon.assert.calledOnce(spy)
        typeof(spy).should.be.a.type('function')
    })
})
