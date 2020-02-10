install:
	npm install

start: 
	npx babel-node src/bin/run-brain-progression.js

publish:
	npm publish --dry-run

lint:
	npx eslint ./
