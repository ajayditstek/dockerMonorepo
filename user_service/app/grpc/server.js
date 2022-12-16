import * as grpc from '@grpc/grpc-js';

import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import Service from '../services';
import constant from '../constant';

const PROTO_PATH = path.join(__dirname, './proto/users.proto');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  getUserById: async (request, callback) => {
    let user = await Service.Users.getUserById(request.request);
    callback(null, user);
  },
});

let host = constant.env.GRPC.NAME;
let port = constant.env.GRPC.PORT;

export default server.bindAsync(
  `${host}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`GRPC Server running at ${host}:${port}`);
    server.start();
  }
);
