const express = require('express');
const app = express();
const WebSocket = require("ws");

const socket = new WebSocket("wss://informer.maximarkets.org/wss/Server.ashx?subscriber=true");

socket.addEventListener('message', function (event) {
    onWebSocketMessage(event.data);
});

socket.onopen = () => {
    onConnect();
};

function onConnect() {
    getSignalsList();
  }

function getSignalsList() {
    socket.send(
      JSON.stringify({
        module: "signals",
        cmd: "list"
      })
    );
}

function onWebSocketMessage(data) {
    const msg = JSON.parse(data.trim());
    if (msg.module !== "rates") {
      if (msg.module === "signals") {
        parseSignals(msg)
      }
    }
  }

  function parseSignals(msg) {
      
    const data = JSON.parse(msg.args);
    console.log(data[2]);
    if (msg.cmd === "list") {
      signals = msg.args;
      getSignals(signals);
    }
  }

  function getSignals(signals) {
    if (signals.length !== 0) {
      socket.send(
        JSON.stringify({
          module: "signals",
          cmd: "",
          args: signals
        })
      );
    }
  }

app.get('/', function (req, res) {
    res.send('Hello World')
  })
   
  app.listen(3000);
