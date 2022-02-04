# logger

This is a simple universal console that *all* scripts (popup, content, background, etc.) can log to, for debugging Safari extensions 10x faster.

You can run it on your own server using the below instructions, **but keep in mind that if you run it on the same machine as your wallet emulator, it won't work.**

Apple's won't let you make XHR requests from extension JavaScript code to localhost on your own machine. Use an external web server instead.

## Install

There's a few dependencies to install:

```sh
npm i
```

## Run

`node server.js` will run the logger on port `3000`.

However, you'll likely want to instead run `server.js` more persistently with a process manager like [pm2](https://github.com/Unitech/pm2), so that the logger stays running even when you terminate your session:

```sh
npx pm2 start server.js
```

Lastly, just forward traffic from port `80` to port `3000`.

### Check status

To display the `pm2` status table:

```sh
npx pm2 status
```

### Stop

To stop running the logger using `pm2`:

```sh
npx pm2 stop <ID>
```

Replace `<ID>` with the `id` on the far-left column of the `pm2` status table row where the `name` column is `server`.

For example: `npx pm2 stop 0`

## License

[MIT](https://github.com/balance-io/logger/blob/master/LICENSE)
