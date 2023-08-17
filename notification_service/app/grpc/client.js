import * as grpc from '@grpc/grpc-js';

import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import constant from '../constant';

const PROTO_PATH = path.join(__dirname, '/proto/users.proto');

console.log('client PROTO_PATH',PROTO_PATH);


const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const UserProto = grpc.loadPackageDefinition(packageDefinition).UserService;

let host = constant.env.GRPC.USER_CONTAINER;
let port = constant.env.GRPC.USER_PORT;

const UserClient = new UserProto(
  `${host}:${port}`,
  grpc.credentials.createInsecure(),
);

console.log(
  `ADMINClient running at ${host}:${port}`
);

export { UserClient };


