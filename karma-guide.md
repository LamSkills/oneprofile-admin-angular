### configure Karma

By default, angularCli will setup everything with karma configurations.
```
npm install --save karma 
npm install --save karma-chrome-launcher 
npm install --save karma-coverage-istanbul-reporter 
npm install --save karma-jasmine 
npm install --save karma-jasmine-html-reporter
npm install --save tslint
npm install --save tslint-sonarts
```

src/karma.conf.js is naturally created by ng-cli (ng new).
```ts
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './app/**/*.component.ts', watch: true},
      { pattern: './app/**/*.service.ts', watch: false},
      { pattern: './app/**/*.model.ts', watch: false},
      { pattern: './app/**/*.module.ts', watch: false}
    ],
    angularCli: {
      environment: 'dev'
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 70,
        lines: 70,
        branches: 70,
        functions: 70
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'ChromeHeadless',
    ],
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ]
      }
    },
    singleRun: false
  });
};
```

src/test.ts
```ts
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /spec\.ts$/);
// And load the modules.
context.keys().map(context);
```
