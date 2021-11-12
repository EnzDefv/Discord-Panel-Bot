module.exports = (client, message) => {
    // Ignoruje Boty 
    if (message.author.bot) return;
  
    // Ignoruje wiadomości bez prefixu oraz bez prefixu projekt nie wystartuje (do ustawienia wy config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Definicje komend.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Pobieranie komend z plików 
    const cmd = client.commands.get(command);
  
    // brak komedny = brak akcji (tak samo z errorami) 
    if (!cmd) return;
    if (message.content == client.config.prefix+'index') return;
  
    // uruchamia Komendy
    cmd.run(client, message, args);
  };
