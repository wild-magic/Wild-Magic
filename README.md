# Wild Magic 🍄✨

🧙‍♀️ An Isomorphic Data-Driven Entity Component System, inspired by Vue.js

Wild Magic is powerful, shifting, and dangerous. Wield it against equally unpredictable situations, like when you'd like that chair to animate into a living being, or a health position to transmutate into a gold brick.

[![CircleCI](https://circleci.com/gh/kenjinp/Wild-Magic.svg?style=shield)](https://circleci.com/gh/kenjinp/Wild-Magic)
[![Coverage Status](https://coveralls.io/repos/github/kenjinp/Wild-Magic/badge.svg?branch=master)](https://coveralls.io/github/kenjinp/Wild-Magic?branch=master)

> [Status](#status) |
> [Getting Started](#getting-started) |
> [Documentation](#documentation) |
> [Development](#development) |
> [License](#license)

## Status

⚠ Alpha! ⚠ Just like Wild Magic, the nature of this code is ever-shifting!

## Use it to run your game!

```typescript
import { Engine, System } from 'wild-magic';
import World from './World';

const renderSystem = new System<{ world: World }>({
  name: 'renderSystem',
  onInit: () => {
    return {
      world: new World(),
    };
  },
  onUpdate: (delta: number, { world }: any) => {
    world.update();
  },
});

const engine = new Engine();
engine.addSystem(renderSystem).start();

requestAnimationFrame(engine.tick);
```

### ✓ TODO list

#### Classes

- [x] Entity
- [x] Component
- [x] System
- [x] Engine

#### Examples

- [ ] three.js Renderer Example

## Development

I recommend using docker, as you can get set up without having to worry about any dependencies, except for docker itself.

### With Docker

Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

- Install: `make install`
- Build: `make build`
- Test: `make test`
- Lint: `make lint`
- Generate Documentation: `make documentation`

### With Node.js

- Install: `npm install`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Generate Documentation: `npm run documentation`

# License

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
