module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  let users = [];

  io.on(`connection`, socket => {

    const {id: socketId} = socket;

    const user = {
      socketId,
      sessionId: ``,
      professionalId: ``,
      familyId: ``,
      modelId: ``,
      isSessionStarted: ``
    };

    users.push(user);

    socket.emit(`init`, users);
    socket.broadcast.emit(`join`, user);

    socket.on(`setProfessionalId`, (id, professionalId) => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.professionalId = professionalId;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`setSession`, (id, familyId, sessionId) => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.familyId = familyId;
        user.sessionId = sessionId;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`startSession`, sessionId => {
      const user = users.find(u => sessionId === u.sessionId);
      if (user) {
        user.isSessionStarted = true;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`disconnect`, () => {
      users = users.filter(s => s.socketId !== socketId);
      socket.broadcast.emit(`leave`, socketId);
      socket.emit(`recheck`, users);
    });

  });

  next();

};

module.exports.register.attributes = {
  name: `users`,
  version: `0.1.0`
};
