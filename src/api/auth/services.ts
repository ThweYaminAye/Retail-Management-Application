import { loginPayload } from './types'
import axi from '@/configs/axios'

const baseUrl = '/Employees'

const login = async (credentials: loginPayload) => {
    const request = await axi.post(`${baseUrl}/Login`, credentials)
    console.log("url is ",baseUrl)
   

    return request.data
}

export default { login }