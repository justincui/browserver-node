!function() {
  var ws = new WebSocket("ws://vcap.me:3572")
  var server = http.createServer(onRequest).listen(ws)

  function error(code, res) {
    res.writeHead(code, {"Content-Type": "text/plain"})

    res.end({
      405: "Method not allowed",
      404: "Not found",
      501: "Not implemented"
    }[code])
  }

  function onRequest(req, res) {
    if (req.url == "/echo") {
      if (req.method != "POST") return error(405, res)

      res.writeHead(200, {"Content-Type": "text/plain"})
      req.on("data", function(data){ res.write(data) })
      req.on("end", function(){ res.end() })
      return
    }

    error(404, res)
  }
}()
