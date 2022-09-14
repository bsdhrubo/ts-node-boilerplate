import * as dotenv from 'dotenv'
dotenv.config()

export const {MONGO_URI, EXTERNAL_API_URL} = process.env 

export const config = {
    mongoURI: MONGO_URI || '',
    externalApiUrl: EXTERNAL_API_URL || ''
}