install:
	npm install

start: 
	npx babel-node src/bin/genDiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint ./
