import mongoose from 'mongoose'
import dns from 'dns/promises'
import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

const connectDB = async () => {
  const uri = process.env.MONGO_URI
  try {
    const conn = await mongoose.connect(uri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.warn(`Initial database connection attempt failed: ${error.message}`)

    if (uri && uri.startsWith('mongodb+srv://') && error.message.includes('querySrv')) {
      console.log('Attempting manual DNS SRV fallback resolution...')
      try {
        const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)([^?]*)(.*)$/)
        if (match) {
          const [_, username, password, host, dbPath, options] = match
          const srvHost = `_mongodb._tcp.${host}`
          let hostList = ''

          try {
            const addresses = await dns.resolveSrv(srvHost)
            if (addresses && addresses.length > 0) {
              hostList = addresses.map(addr => `${addr.name}:${addr.port}`).join(',')
            }
          } catch (dnsErr) {
            console.warn(`Node DNS resolveSrv failed: ${dnsErr.message}. Trying shell nslookup fallback...`)
            const { stdout } = await execPromise(`nslookup -type=SRV ${srvHost}`)
            const shardHosts = []
            const regex = /svr hostname\s*=\s*([a-zA-Z0-9.-]+)/g
            let matchResult
            while ((matchResult = regex.exec(stdout)) !== null) {
              shardHosts.push(matchResult[1].trim())
            }

            if (shardHosts.length > 0) {
              hostList = shardHosts.map(shHost => `${shHost}:27017`).join(',')
            }
          }

          if (hostList) {
            let suffix = dbPath || '/portfolio'
            if (!suffix.includes('ssl=')) {
              suffix += (suffix.includes('?') ? '&' : '?') + 'ssl=true'
            }
            if (!suffix.includes('authSource=')) {
              suffix += '&authSource=admin'
            }

            const directUri = `mongodb://${username}:${password}@${hostList}${suffix}`
            console.log('Connecting via fallback direct connection URI...')

            const conn = await mongoose.connect(directUri, { serverSelectionTimeoutMS: 5000 })
            console.log(`MongoDB Connected (via SRV Fallback): ${conn.connection.host}`)
            return
          }
        }
      } catch (fallbackErr) {
        console.error(`SRV Fallback resolution failed: ${fallbackErr.message}`)
      }
    }

    console.error(`Database connection final error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
