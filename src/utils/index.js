import crypto from 'crypto'
import { formatDistance, fromUnixTime } from 'date-fns' 

export const md5 = (str) => {
    return crypto.createHash('md5').update(str).digest("hex")
}

export const  cgravatar = (email) => {
    return 'https://www.gravatar.com/avatar/' + md5(email)+ '?d=retro&r=PG'
}

export const fromAgo = (timestamp) => {
    return formatDistance(fromUnixTime(timestamp), new Date(), { addSuffix: true });
 }
 
