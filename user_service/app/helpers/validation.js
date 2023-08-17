class ValidationHelper {
    validate(route,method,v) {
        v.addSchema(addressSchema, '/SimpleAddress');
        let obj = {};
        switch (method) {
            case 'get':
                obj = {
                    '/*': schema,
                    '/user/:id': schema,
                }
                return {schema: obj[route], val: v};
                break;
            case 'post':
                obj = {
                    '/register': registerSchema,
                    '/api/login': loginSchema,
                    // '/api/update/:id?' : updateProfileSchema
                }
                return {schema: obj[route], val: v};
                break;
            case 'put':
                obj = {
                    '/user/:id': schema,
                    '/api/update/:id?' : updateProfileSchema
                }
                return {schema: obj[route], val: v};
                break;
            default :
            return {schema: obj[route], val: v};
                break;
        }
    }
}

const updateProfileSchema = {
  "id": "/updateSchema",
  "type": "object",
  "properties": {
    "fullName": {"type": "string", "minLength":1},
    "DOB" : {"type": "string","format":"date", "minLength":8},
    "email": {"type": "string",'format': 'email', "minLength":5},
    "password": {"type": "string", "minLength":8}
  },
  //"required": ["fullName","DOB","email","password"]
};

const registerSchema = {
  "id": "/registerSchema",
  "type": "object",
  "properties": {
    "fullName": {"type": "string"},
    "DOB" : {"type": "string"},
    "email": {"type": "string",'format': 'email'},
    "password": {"type": "string"}
  },
  "required": ["fullName","DOB","email","password"]
};

const loginSchema = {
  "id": "/loginSchema",
  "type": "object",
  "properties": {
    "email": {"type": "string",'format': 'email'},
    "password": {"type": "string"}
  },
  "required": ["email","password"]
};

const addressSchema = {
  "id": "/SimpleAddress",
  "type": "object",
  "properties": {
    "lines": {
      "type": "array",
      "items": {"type": "string"}
    },
    "zip": {"type": "string"},
    "city": {"type": "string"},
    "country": {"type": "string"}
  },
  //"required": ["country"]
};

const schema = {
  "id": "/SimplePerson",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "address": {"$ref": "/SimpleAddress"},
    "votes": {"type": "integer", "minimum": 1}
  },
  //"required": ["name","address"]
};

export default new ValidationHelper();