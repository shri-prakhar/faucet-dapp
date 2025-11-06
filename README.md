# faucet-dapp

Lightweight Solana devnet faucet DApp — a minimal React + TypeScript + Vite project that lets a connected wallet request SOL airdrops on the Solana devnet.

This repository provides a small UI that integrates with the Solana Wallet Adapter and the Phantom wallet to request testnet/devnet airdrops for the connected wallet using the Web3 RPC requestAirdrop method.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick demo / screenshots](#quick-demo--screenshots)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Environment variables](#environment-variables)
  - [Run locally](#run-locally)
- [Usage](#usage)
- [Project structure and contract](#project-structure-and-contract)
- [Development & build scripts](#development--build-scripts)
- [Security & notes](#security--notes)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements & resources](#acknowledgements--resources)

## Features

- Connect / disconnect with Phantom (via Solana Wallet Adapter)
- Request a Solana devnet airdrop to the connected wallet (configurable amount of SOL)
- Small, focused UI component for requesting airdrops (see `src/RequestAirdrop.tsx`)

## Tech stack

- React 19 + TypeScript
- Vite (dev server / build)
- Solana Web3.js and @solana/wallet-adapter packages
- Tailwind CSS (classes are present in components)
- ESLint for linting

## Quick demo / screenshots

Open the app in your browser after running the dev server, connect Phantom and enter an amount (e.g., `1`) in the input, then click `Request Airdrop`. The UI will call `connection.requestAirdrop` for the connected public key.

## Getting started

### Prerequisites

- Node.js (recommended 18.x or newer) and npm
- A browser with the Phantom wallet extension (or another wallet compatible with the Solana Wallet Adapter)

### Install

Clone the repository and install dependencies:

```bash
# from project root
npm install
```

### Environment variables

By default the project currently includes a hard-coded endpoint URL inside `src/App.tsx`. It's best practice to replace that with an environment variable for portability and security.

Recommended approach: add a `.env` file in the project root with a Vite-prefixed variable. Example `.env` contents:

```env
# Example: use your own RPC or Alchemy RPC. Do NOT commit your secrets to git.
VITE_SOLANA_RPC_URL=https://solana-devnet.example.com
```

Then update `src/App.tsx` to read the endpoint from `import.meta.env.VITE_SOLANA_RPC_URL` (see the note below). The current `App.tsx` uses a hard-coded Alchemy devnet RPC URL — replace it with your own or with an env var before deploying or sharing.

### Run locally

Start the dev server:

```bash
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser. Connect Phantom and use the `Request Airdrop` control to request devnet SOL.

### Build / Preview

Build the optimized bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Usage

1. Start the dev server (see above).
2. Open the app in your browser.
3. Click the wallet connect button (Phantom). If Phantom is not installed, install it and refresh.
4. Enter the amount of SOL to request (the component multiplies by LAMPORTS_PER_SOL internally).
5. Click `Request Airdrop`.

The app uses `connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL * amount)`. The function will show alerts on success or error. The UI will show a loading spinner while the request is in progress.

## Project structure and contract

- `index.html` — Vite entry HTML
- `src/main.tsx` — React mount (renders `<App />`)
- `src/App.tsx` — Solana connection and wallet provider wiring, currently contains an RPC endpoint string
- `src/RequestAirdrop.tsx` — small form component that accepts an amount and calls `connection.requestAirdrop`

Component contract (short):

- RequestAirdrop:
  - Inputs: user-entered amount (string input, converted to Number)
  - Side-effects: requires connected wallet; calls `connection.requestAirdrop(wallet.publicKey, amountInLamports)`
  - Outputs: browser alert for success/failure, toggles an internal loading state

Edge cases considered in code:

- No wallet connected: user is alerted to connect first
- Non-numeric or non-positive amount: user is alerted to enter a valid amount
- Errors from RPC (network, invalid key): caught and an alert shown

## Development & build scripts

Key npm scripts from `package.json`:

- `npm run dev` — start Vite dev server
- `npm run build` — run TypeScript build (project references) and build via Vite
- `npm run preview` — preview production build
- `npm run lint` — run ESLint over the codebase

## Security & notes

- IMPORTANT: The current `src/App.tsx` includes a hard-coded RPC endpoint (an Alchemy devnet URL). Exposing API keys or RPC endpoints in public repos is not recommended. Replace that with `import.meta.env.VITE_SOLANA_RPC_URL` or another secure configuration and keep secrets out of source control.
- This project targets Solana devnet/testnet usage only. `requestAirdrop` has no effect on mainnet and cannot be used to obtain real funds.

## Contributing

Contributions are welcome. Typical workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-change`.
3. Make changes and add tests if relevant.
4. Run lint and build locally.
5. Open a PR with a clear description.

If you open issues or PRs related to security (exposed keys), please use private channels or mark them sensitive.

## TODO / Improvements

- Move hard-coded RPC URL into environment variables.
- Add unit/integration tests (e.g., component tests using React Testing Library + msw to mock RPC calls).
- Add form validation and user-friendly error toasts instead of browser alerts.
- Add CI to run lint and build.

## License

This project is released under the MIT License — see `LICENSE` for details.

