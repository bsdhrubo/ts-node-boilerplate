import * as dotenv from 'dotenv'
dotenv.config()

export const {MONGO_URI} = process.env

export const config = {
    mongoURI: MONGO_URI || ''
}