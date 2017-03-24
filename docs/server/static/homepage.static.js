export function homePage(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=11">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <title>Reactables</title>
        <style>
          html { font-family: Helvetica, arial, sans-serif }
          html, body, #root {
            margin: 0;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;

          }
          body { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div id="root">${ html }</div>
        <script src="client.js"></script>
      </body>
    </html>`
}
