import { useEffect } from 'react';
const socket = new WebSocket('ws://localhost:8080');

function App() {

    useEffect(() => {
        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            console.log(data)
            if (data.type === 'notification') {
                alert(data.message); // Exibir a notificação
            }
        };
    }, [socket])

    return (
        <div>ok</div>
    );
}

export default App;

function sendNotification(body, user = "") {
    if (!user) {
      for (const userId in clients) {
        const client = clients[userId];
        client.send(JSON.stringify({ type: 'notification', message: body.message }));
      }
    } else {
      try {
        const client = clients[user];
        client.send(JSON.stringify({ type: 'notification', message: body.message }));
      } catch (error) {
        console.log(`Error sending notification to user ${user}:`, error.message);
      }
    }
  }
  
