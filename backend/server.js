import 'dotenv/config.js'
import app from './app.js'
import http from 'http'

const PORT=process.env.PORT||4000

const server=http.createServer(app)


server.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})