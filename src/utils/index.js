import crypto from 'crypto'

export const md5 = (str) => {
    return crypto.createHash('md5').update(str).digest("hex")
}

export const  cgravatar = (email) => {
    return 'https://www.gravatar.com/avatar/' + md5(email)+ '?d=robohash&r=PG'
}
