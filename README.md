# Create Zen React App

<img alt="Logo" align="right" src="https://create-react-app.dev/img/logo.svg" width="20%" />

Create React apps with no build configuration or with your preffered webpack configurations.

## Quick Overview

```sh
npx create-zen-react-app my-app
cd my-app
npm run dev
```

If you've previously installed `create-zen-react-app` globally via `npm install -g create-zen-react-app`, we recommend you uninstall the package using `npm uninstall -g create-zen-react-app` or `yarn global remove create-zen-react-app` to ensure that npx always uses the latest version.

## Installation
```sh
npx create-zen-react-app my-app
```
```sh
yarn create zen-react-app my-app
```
It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── icon.svg
│   └── index.html
└── src
    ├── App.tsx
    ├── preload.js
    ├── index.js
    └── logo.svg
```

No configuration or complicated folder structures, only the files you need to build your app.<br>
Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

## Commands

### dev
Starts project for development on `http://localhost:3000`.

#### -s or --silent
Starts project for development on `http://localhost:3000` but doesn't open in a new tab of default browser.

### build
Builds the react project for deployment. Will be placed in `./build`

#### --hash
Builds with a unique hash like `app.9dbf42.js`. If not specified it uses `[fullhash:8]` which is a common hash usage in webpack configs. More configurability will be added in future.

#### --analyze
Builds and creates a report on `http://localhost:3002`

### start
Starts built project for production on `http://localhost:3001`.

### local
Builds the project and starts an instance on `http://localhost:3001`


## Building the App

`npm run build` or `yarn build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode using `preact` and optimizes the build for the best performance with `terser`.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## Custom Webpack Configuration

You can overwrite the custom configuration of your app via placing `webpack.config.js` in your project root. Webpack configurations can passed inside `production` and `development` keys in object.
```js
module.exports = {
  production: {
    output: {
      publicPath: "/yourDesiredPath/",
    },
  },
  development: {
    devtool: "source-map",
  }
};

```


## Philosophy

- **Always up-to-date:** Aim is to get most modern and consistent packages in the boilerplate.

- **One Dependency:** There is only one build dependency. It uses webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them.

- **No Configuration Required:** You don't need to configure anything. A reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

## What’s Included?

Your environment will have everything you need to build a modern single-page React app:

- React, JSX, ES6, TypeScript  syntax support.
- Routing by default with latest [react-router-dom](https://github.com/remix-run/react-router)
- Language extras beyond ES6 like the object spread operator.
- A live development server that warns about common mistakes.
- A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
- Hassle-free updates for the above tools with a single dependency.
- Code Splitting

## Web Workers

Now you can start using Web Workers! Two things are important here: Files that contain a Web Worker must end with `*.worker.ts`, and they
must start with the following two lines of code in order to work nicely together with TypeScript:

```ts
declare const self: DedicatedWorkerGlobalScope;
export default {} as typeof Worker & { new (): Worker };

// Your code ...
```

In your application, you can import your Web Workers like a normal module, and instantiate them as a class. For example:

```ts
import MyWorker from './MyWorker.worker';

const myWorkerInstance: Worker = new MyWorker();
```