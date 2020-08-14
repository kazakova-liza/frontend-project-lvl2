install:
	npm install

json:
	npx babel-node src/bin/genDiff.js --format=json __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

plain:
	npx babel-node src/bin/genDiff.js --format=plain __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

tree:
	npx babel-node src/bin/genDiff.js --format=tree __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint ./

lint-fix:
	npx eslint --fix ./

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
