.PHONY: all lint
NODE_BIN=$(shell npm bin)

all: lint

test: node_modules/
	$(NODE_BIN)/jest

lint: node_modules/
	$(NODE_BIN)/eslint src/

node_modules/: package.json
	npm install
	touch node_modules/
