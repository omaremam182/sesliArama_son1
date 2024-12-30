function generateRandomString(length = 7) {
  const characters =
    "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

// fonksiyon, yeni bağlanan kullanıcıyı tüm istemcilere duyurur.
function broadcastNewUser(wss, newUserID) {
  try {    
    wss.clients.forEach((client) => { //websocket sunucusuna bağlı tüm istemciler üzerinde bir döngü oluşturur.
      if (client !== wss && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "new_user", data: newUserID }));
      }
    });
  } catch (error) {
    console.error("Error when broadcasting new user:", error.message);
  }
}


// dosyadaki fonksiyonları diğer dosyalarda kullanılmasına muüsaade edilir.
module.exports = { generateRandomString, broadcastNewUser };
