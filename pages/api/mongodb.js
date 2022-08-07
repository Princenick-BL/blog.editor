import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_APP_CONNEXION_STRING.replace('<username>', process.env.NEXT_PUBLIC_APP_MONGO_USER).replace('<password>', encodeURIComponent(process.env.NEXT_PUBLIC_APP_MONGO_PASSWORD)).replace('<host>', process.env.NEXT_PUBLIC_APP_MONGO_HOST).replace('<db>', process.env.NEXT_PUBLIC_APP_MONGO_DB);
const MONGODB_DB = process.env.NEXT_PUBLIC_APP_MONGO_DB;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
