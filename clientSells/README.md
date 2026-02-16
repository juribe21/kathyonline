
# dotnet ef migrations add AddProductPictures
# dotnet ef database update


# ClientSells

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

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

### **********************\*\*\*\***********************\*\*\*\***********************\*\*\*\***********************

## Compact Folder

- Settings/compact → unselect compact folders

### Tailwind CSS dev

- https://tailwindcss.com/docs/installation/using-postcss
- npm install tailwindcss @tailwindcss/postcss
- create file → @import "tailwindcss"; and paste the plugin reference
- into styles.css → @import "tailwindcss";

### daisyui

- npm i -D daisyui@latest
- Tailwind CSS IntelliSense install extension
-

### EF

- dotnet ef database update
- dotnet ef database drop

### Security JWTS

- System.IdentityModel.Tokens.Jwt
- Microsoft.IdentityModel.Tokens

### schematics

- Add into schematics configuration to create components

### Dropdown - focus

- https://daisyui.com/components/dropdown/
- Method 3. CSS focus - L50
<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">Click</div>
  <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

### Select - Fill and use select - Seccion 5 - Lesson 56

  <select name="SelCategoria" id="selCategoria" class="select w-full">
      <option value="Selected">Seleecion</option>
      @for(member of  members(); track $index){
        <option value="{{member.id}}">{{member.name}}</option>
      }
  </select>

## toast

- https://daisyui.com/components/toast/
- Check toast-service.ts

## **_ Check lesso 68 App initialization _**

- init service
