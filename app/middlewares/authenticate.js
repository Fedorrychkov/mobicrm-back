const jwtsecret = "mysecretkey",
      jwt = require('jsonwebtoken'),
      socketioJwt = require('socketio-jwt'),
      socketIO = require('socket.io'),
      crypto = require('crypto');