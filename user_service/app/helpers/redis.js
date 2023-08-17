import { createClient } from 'redis';
import constant from '../constant';
class RedisHelper {
    #client;
    #host = constant.env.REDIS_HOSTNAME;
    #port = constant.env.REDIS_PORT;
    #auth = constant.env.REDIS_AUTH;
    //#redisObj = redis;

    constructor() {
        // this.client = createClient(this.port, this.host);
        this.client = createClient({url : "redis://redis_c"});
        
        this.client.on('connect', (res) => { 
            console.log('Redis Connected');
        });

        this.client.on('error', (err) => {
            console.log('Redis Connection error',err);
        });

        this.client.connect();

        this.client.set('connection_key', 'connection_established', {
            EX: 10,
            NX: true
        });
    }

    // Set String value for given key
    // Note expires time secounds
    /**
     * @params { key, value, db, expires}
     */
    async setString(payload) {
        if (payload.db && payload.db !== '') {
          this.client.select(payload.db);
        }
        return new Promise((resolve, reject) => {
            this.client.set(payload.key, payload.value, (err, reply) => {
                if (err) {
                  return reject(err);
                }
                // Add Expire Time if provided
                if (payload.expires && payload.expires !== 0) {
                  this.client.expire(payload.key, (payload.expires * 60));
                }
                resolve(reply);
            });
        });
    }

    // Get String value for given key
      async getString(key,  database = '') {
        if (database !== '') {
          this.client.select(database);
        }
        return  await this.client.get(key);
          // return new Promise((resolve, reject) => {
          //   this.client.get(key, (err, reply) => {
          //     console.log('------------------',err);
          //     console.log('------------------',reply);
          //     if (err) {
          //       return reject(err);
          //     }
          //     resolve(reply);
          //   });
          // });
      }

      async destroyDb(dbKey) {
        return new Promise((resolve, reject) => {
          this.client.del(dbKey, (err, response) => {
            if (response === 1) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      }

}
export default new RedisHelper();
