install:
	npm install

plain json:
	npx babel-node src/bin/genDiff.js --format=plain __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree.json

tree json:
	npx babel-node src/bin/genDiff.js --format=tree __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree.json

yml:
	npx babel-node src/bin/genDiff.js __tests__/__fixtures__/before_tree.yml __tests__/__fixtures__/after_tree.yml

ini:
	npx babel-node src/bin/genDiff.js __tests__/__fixtures__/before_tree.ini __tests__/__fixtures__/after_tree.ini

publish:
	npm publish --dry-run

lint:
	npx eslint ./
