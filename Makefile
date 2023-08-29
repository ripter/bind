.PHONY: all build test lint

all: lint

build: node_modules/
	npx webpack

test: node_modules/
	npx mocha src/**/*.test.js

lint: node_modules/
	npx eslint src/

node_modules/: package.json
	npm install
	touch node_modules/
