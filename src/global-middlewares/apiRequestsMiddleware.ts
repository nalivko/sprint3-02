import { Request, Response, NextFunction } from "express";
import { apiRequestsCollection } from "../db/mongodb";
import { ApiRequestDbType } from "../db/api-request-db-type";
import { add } from "date-fns/add"
import { subSeconds } from 'date-fns';

export const apiRequestsMiddleware = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {

    // console.log('original', req.originalUrl);

    const URL = req.originalUrl
    const ip = req.ip!
    const now = new Date()
    const tenSecondsAgo = subSeconds(now, 10);

    const request: ApiRequestDbType = {
        ip: req.ip!,
        URL: req.originalUrl,
        date: now
    }

    await apiRequestsCollection.insertOne(request)

    const countRequests = await apiRequestsCollection.countDocuments({
        ip: ip,
        URL: URL,
        date: {
            $gt: tenSecondsAgo
        }
    })

    if (countRequests > 5) {
        res.send(429)
        return
    }

    next()
}