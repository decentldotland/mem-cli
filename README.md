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
npm i -g mem-cli-js
```

## CLI Commands

### Deploy a MEM serverless function:

```bash
mem deploy --src [path-to-source-code] --init-state [stringified-initial-state || ./path-to-state.json] --testnet [optional to deploy on MEM Carbon testnet]
```

#### Example

```bash
mem deploy --src ./function.js --init-state '{"logs": []}'
```

### Write to a MEM serverless function:

```bash
mem write --functionId [MEM function ID] --inputs [the contract interaction stringified inputs object] --testnet [optional to write to a MEM Carbon function]
```

#### Example

```bash
mem write --function-id e695edc7-4919-0a1d-3d99-b725661904ad --inputs '{"function":"increment"}'
```

## License
This project is licensed under the [MIT License](./LICENSE)
