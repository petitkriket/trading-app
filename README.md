# Corridor 5 Trading App

SpaceTraders is a persistent universe multiplayer game (MMO) with an open access API.

This application is a GUI for the SpaceTraders API first game.
It's deployed [here](https://petitkriket.github.io/trading-app/).

SpaceTraders mechanics and lore can be found at the [SpaceTraders website](https://docs.spacetraders.io/quickstart/first-mission).

## Features

**Implemented:**

- Authentication and agent management
- Star systems exploration

**Planned:**

- Navigation between star systems
- Fleet management
- Markets and trading
- Real-time notifications or events
- Trading bots for automated trading
- Localization if demanded
  See [ROADMAP.md](./docs/ROADMAP.md) for details.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- A SpaceTraders account (register at [SpaceTraders API Dashboard](https://my.spacetraders.io/))

## Running the UI locally

If using nvm (recommended), set Node.js version:

```sh
nvm use
```

Install dependencies:

```sh
npm install
```

Run the application:

```sh
npm run dev
```

## Development

Generate API types from SpaceTraders OpenAPI spec:

```sh
npm run generate:api
```

See the [SpaceTraders API Documentation](https://spacetraders.io/openapi) for more details.

### Tech Stack

- TypeScript
- OpenAPI-first approach with auto-generated types
- Vite
- Vue 3
- Vue Router
- TanStack Query
- Pinia
- Cypress

### Testing

Run component tests:

```sh
npm run test:unit:dev
```

Run e2e tests:

```sh
npm run test:e2e:dev
```

### Linters, Formatters, and Type Checking

Check and fix code:

```sh
npm run lint
npm run format
npm run type-check
```

### Build

Build for production:

```sh
npm run build
```

### Project Structure

This project follows a feature-based folder structure:

```
src/
├── features/     # Feature modules (auth, agent, systems, etc.)
├── core/         # Shared core utilities and APIs
└── layouts/      # Layout components
```

Each feature is self-contained with its own components, composables, and types.

### Documentation

For more details on architecture decisions and project roadmap, see the [docs](./docs) folder:

- [NOTES_INITIALES.md](./docs/NOTES_INITIALES.md) - Architecture overview and requirements
- [DECISIONS.md](./docs/DECISIONS.md) - Technical decisions with alternatives and rationale
- [ROADMAP.md](./docs/ROADMAP.md) - Feature roadmap and development progress
