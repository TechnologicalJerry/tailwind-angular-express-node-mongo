# TailwindAngularExpressNodeMongo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Application File structure
angular-client/
├── src/
│   ├── app/
│   │   ├── app.config.ts                     # App-wide providers (router, http, etc.)
│   │   ├── app.routes.ts                     # All routes (using loadComponent)
│   │   ├── app.ts                            # Root standalone component
│   │   ├── app.html                          # Root component template
│   │   ├── app.scss                          # Root styles
│   │   ├── app.spec.ts                       # Root component test
│   │
│   │   ├── pages/                            # All top-level page components
│   │   │   ├── landing/
│   │   │   │   ├── landing.component.ts
│   │   │   │   ├── landing.component.html
│   │   │   │   ├── landing.component.scss
│   │   │   │   └── landing.component.spec.ts
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.scss
│   │   │   │   └── login.component.spec.ts
│   │   │   ├── signup/
│   │   │   │   ├── signup.component.ts
│   │   │   │   ├── signup.component.html
│   │   │   │   ├── signup.component.scss
│   │   │   │   └── signup.component.spec.ts
│   │   │   ├── forgot-password/
│   │   │   │   ├── forgot-password.component.ts
│   │   │   │   ├── forgot-password.component.html
│   │   │   │   ├── forgot-password.component.scss
│   │   │   │   └── forgot-password.component.spec.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   └── dashboard.component.spec.ts
│   │   │   └── products/                     # Future-ready
│   │   │       ├── products.component.ts
│   │   │       ├── products.component.html
│   │   │       ├── products.component.scss
│   │   │       └── products.component.spec.ts
│   │
│   │   ├── core/                             # Global services, guards, interceptors
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── token.interceptor.ts
│   │   │   │   └── auth.constants.ts
│   │   │   └── services/
│   │   │       └── api.service.ts
│   │
│   │   ├── shared/                           # Reusable UI components, directives
│   │   │   ├── components/
│   │   │   │   └── input-field/
│   │   │   │       ├── input-field.component.ts
│   │   │   │       ├── input-field.component.html
│   │   │   │       ├── input-field.component.scss
│   │   │   │       └── input-field.component.spec.ts
│   │   │   ├── directives/
│   │   │   └── pipes/
│
│   ├── index.html
│   ├── main.ts                              # Bootstrap with bootstrapApplication
│   ├── styles.scss                          # Global styles
│
├── angular.json
├── tsconfig.json
├── package.json
└── README.md
