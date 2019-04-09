<p align="center"><a href="https://wildmagic.io" target="_blank" rel="noopener noreferrer"><img height="300" src="https://wildmagic.io/_next/static/images/wildmagic-og-aef43d678dae8ef41adbb22976c566b5.png" alt="Wild Magic logo"></a></p>

<p align="center">
  <a href="https://lernajs.io/"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="Build Status"></a>
</p>

<h2 align="center">Games with Javascript</h2>

## Concepts

Very terribly explained :)

### Component Graph System

This expands on the [ECS, _Entity Component System_ ](https://en.wikipedia.org/wiki/Entity_component_system) architecture. A game Engine manages a list of Systems, each of whom follow and impact changes on a list of Entities. Entities have their list of components, which are discrete bags of state.

Instead, Wild-Magic will be component-first, so that components may reference other components in a graph-like way.

### Data-Driven

The ECS or Component-Graph-System means that the games programmer must operate on data, instead of designing complex webs of logic inside classes and handlers. This is a little hard to explain, I'd like to prove it in a demo.

### Stateless

The game system is immutable and stateless. Each activity produces an entirely new engine object. At any time data can be injected, for example, from local storage or from a server, and the game logic will rehydrate.

### Functional

This project, at least the core package, aims to be functional where possible to aid in testing, and as a creative constraint.
Here functional means using composition, unary functions, and disallowing certain code concepts such as classes and if blocks to limit side-effects.

## Status

Beta! The nature of this code is ever-shifting!

## Development

> Note: If you don't have Node.js installed on your machine, you can run a "docker shell" with make dshell from which you'll have a fully working Node.js environment. Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

- Install dependencies: `make install`
- Run in dev mode: `make start`
- Build: `make build`
- Test: `make test`
- Lint: `make lint`
- Clean: `make clean`

This project is a mono-repo, setup using [Lerna](https://lernajs.io/). All packages can be found under `./packages/`.

Some useful commands:

- `lerna run --scope package-name dev --stream` will run the dev script defined in package-name project
