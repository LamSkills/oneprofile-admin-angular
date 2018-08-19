### configure Karma



### configure Jest

required to run debug mode (xmlhttprequest is built-in in browsers, not node)
```sh
npm install xmlhttprequest
```

```sh
#npm install --save-dev ts-jest @types/jest
yarn add -D jest jest-preset-angular
```
This will install jest, @types/jest, ts-jest, jest-zone-patch as dependencies needed to run with Angular projects.


```sh
echo "
import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test
" > setupJest.ts
```

add this to package.json:
```json
"jest": {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
  }
```