import { config } from 'dotenv';
config();
import grpcConnection from './server'

( () => {
    grpcConnection
})();