<p align="center">
  <a href="https://decent.land">
    <img src="https://github.com/decentldotland/MEM/assets/77340894/d840ef84-540f-4ccc-a7e0-1ed03c4af8dd" height="180">
  </a>
  <h3 align="center"><code>@decentdotland/mem-cli</code></h3>
  <p align="center">a CLI to interact with the MEM protocol</p>
</p>



## Build & Run Server

```bash
git pull https://github.com/decentldotland/mem-cli.git

npm install && npm run server
```

## Install the CLI

```bash
npm i -g mem-cli
```

## CLI Commands

### Deploy smart contract (serverless function):

```bash
mem deploy --src [path-to-source-code] --init-state [stringified-initial-state]
```

#### Example

```bash
mem deploy --src ./contract.js --init-state '{"logs": []}'
```

## License
This project is licensed under the [MIT License](./LICENSE)