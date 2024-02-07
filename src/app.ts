import API from '@/api'
import connect from '@/models/connector'
;(async () => {
    await connect()
    const api = new API()

    api.listen()
})()
