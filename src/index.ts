import {app} from './app'
import {SETTINGS} from './settings'
import { runDb } from './db/mongodb';
 
const startApp = async () => {
    await runDb()
    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
}

startApp()