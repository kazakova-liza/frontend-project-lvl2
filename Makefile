install:
	npm install

start: 
	npx babel-node src/bin/genDiff.js src/before.json src/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint ./
