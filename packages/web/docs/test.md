## Goals

A marriage of game and web development techniques to make it easier for people coming from a web engineering background to grok the complexities of game state and game logic. It should provide a framework to guide them in creating games using concepts they may be familiar with, including extractable and stateless libraries / components for the purpose of including in other games.

Additionally, this is a learning venture to explore the complexities of webGL and gaming.

## Context & Integration

Game development is hard and examples I find online are often spaghettified monstrosities, which makes sense, because it’s difficult to structure discrete pieces of code to build the complex chain of logic possible in games. This makes game development tough to learn and it makes game repositories hard to reason about. I think a somewhat opinionated composable system implementing the much touted Entity Component System that has the developer experience of something like React or Vue would simplify development.

### Why Entity Component System

ECS is an interesting architecture that allows for composable components that can be removed and added at any point in the game’s lifecycle. This makes it really compelling because it can be used to quickly mock up data, use as a modding API, extend content and reason about game entities.

Combined with a immutable state manager, an ECS can easily implement time travel, game saving, dynamic entity behavior changing, simple multiplayer implementation, and many more cool things.

### Browser Gaming

Such a system could be easily embedded in any webview or console, anywhere node could be executed, and therefore is a viable platform for desktop, mobile, or browser gaming.

What makes me especially excited, is for the possibility of complex games for the browser. Most games for the browser are toys or experiments, or are small consumable microgames for big portals like facebook. I’d like to take this framework as a basis to build something bigger. This is where I announce my AAA title.

## Features

This project should:

- Be js framework agnostic
- Isomorphic
- Be rendering agnostic
- Enforce opinionated stateless system management
- Be compatible with HMR (hot module reloading)
- Create entities (components?) using composition
- Enable hydration / serialization of state at any arbitrary point in time
- Enable state updates from server
- Be performant (none of my previous 20fps nonsense)
- Enable the packaging of components and systems as libraries to be easily shared between repos
- Have a great developer experience!
- Be agnostic where the state comes from (could be server, indexDB, localstorage, webworker, etc)
