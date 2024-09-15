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
