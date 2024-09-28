// import { ExpiredTokenDbType } from "../../../db/auth-session-db-type"
// import { expiredTokensCollection } from "../../../db/mongodb"

// export const expiredTokensRepository = {
//     async addToken(token: ExpiredTokenDbType): Promise<boolean> {

//         await expiredTokensCollection.insertOne(token)

//         return true
//     },

//     async isTokenExpired(token: string): Promise<boolean> {
//         const expToken = await expiredTokensCollection.findOne({token})
        
//         return expToken ? true : false
//     }
// }