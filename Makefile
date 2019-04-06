.PHONY: build test clean

ME=`id -u`:`id -g`

dshell:
	@echo "Running a Docker shell... 🐚"
	@docker-compose run --rm --user ${ME} --entrypoint bash wild-magic

install:
	@echo "Installing project's dependencies... 🚀"
	@yarn
	@node_modules/.bin/lerna bootstrap

start:
	@echo "starting all the things in dev mode"
	@./node_modules/lerna/cli.js run dev --stream

build:
	@echo "Building ALL projects... 👷"
	@./node_modules/lerna/cli.js run build --stream

test:
	@echo "Running tests in ALL projects... 👩‍🏫"
	@./node_modules/lerna/cli.js run test --stream

lint:
	@echo "Linting ALL projects... ✨"
	@./node_modules/lerna/cli.js run lint --stream

clean:
	@echo "Cleaning ALL projects... 🗑"
	@./node_modules/lerna/cli.js run clean --stream
	@rm -fr node_modules/