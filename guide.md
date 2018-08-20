### configure Karma



### configure Jest

```sh
yarn add -D jest jest-preset-angular
```
This will install jest, @types/jest, ts-jest, jest-zone-patch as dependencies needed to run with Angular projects.


```sh
echo "
import 'jest-preset-angular';
" > setupJest.ts
```

add this to package.json:
```json
"jest": {
    "preset": "jest-preset-angular",
    "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
  }
```