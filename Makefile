.PHONY: all build test lint
NODE_BIN=$(shell npm bin)

all: lint

build: node_modules/
	$(NODE_BIN)/webpack

test: node_modules/
	$(NODE_BIN)/mocha src/**/*.test.js

lint: node_modules/
	$(NODE_BIN)/eslint src/

node_modules/: package.json
	npm install
	touch node_modules/
