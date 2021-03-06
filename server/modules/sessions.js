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
      onboarding: true,
      currentLanguage: 0,
      modelInfo: [],
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
        user.pageRefreshed = false;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`startSession`, familyId => {
      const user = users.find(u => familyId === u.familyId);
      if (user) {
        user.isSessionStarted = true;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`setModel`, (id, modelId) => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.modelId = modelId;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`handleModel`, (id, scope, modelInfo) => {
      let user;
      if (scope === `professional`) user = users.find(u => id === u.socketId);
      else user = users.find(u => id === u.familyId);
      if (user) {
        user.modelInfo = modelInfo;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`handleModelLanguage`, (id, modelInfo) => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.modelInfo = modelInfo;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`handleCurrentLanguage`, (id, currentLanguage) => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.currentLanguage = currentLanguage;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`handleOnboarding`, (id, scope, onboarding, modelInfo) => {
      let user;
      if (scope === `professional`) user = users.find(u => id === u.socketId);
      else user = users.find(u => id === u.familyId);
      if (user) {
        user.onboarding = onboarding;
        user.modelInfo = modelInfo;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`stopSession`, id => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.familyId = ``;
        user.sessionId = ``;
        user.modelId = ``;
        user.isSessionStarted = false;
        socket.broadcast.emit(`recheck`, users);
      }
    });

    socket.on(`stopModel`, id => {
      const user = users.find(u => id === u.socketId);
      if (user) {
        user.modelId = ``;
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
