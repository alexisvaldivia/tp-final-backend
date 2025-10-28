export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log(`🔴Usuario desconectado (${socket.userId})`);
    });
  });
};
