<p align="center"><a href="https://wildmagic.io" target="_blank" rel="noopener noreferrer"><img height="300" src="https://wildmagic.io/_next/static/images/wildmagic-og-aef43d678dae8ef41adbb22976c566b5.png" alt="Wild Magic logo"></a></p>

<h2 align="center">Games with Javascript</h2>

## Status

Alpha! The nature of this code is ever-shifting!

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
