# Word Add-in Taskpane React

This project is a Word Add-in built using React and Fluent UI. It demonstrates how to integrate React components with Office Add-ins to extend Word's functionality.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Microsoft 365 account (to sideload and test the add-in)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OfficeDev/Office-Addin-TaskPane-React.git
   cd Office-Addin-TaskPane-React
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate SSL certificates for development:

   ```bash
   npx office-addin-dev-certs install
   ```

4. Start the development server:

   ```bash
   npm run dev-server
   ```

5. Open the project in Word:

   ```bash
   npm start
   ```

   This will launch Word and sideload the add-in.

## Features

- **React Integration:** Modern UI development using React.
- **Fluent UI Components:** Consistent design and accessibility with Fluent UI.
- **Build and Debug Tools:** Easy to build and debug with Webpack and Office Add-in tools.

## Scripts

Below are the available npm scripts for this project:

| Script               | Description                         |
| -------------------- | ----------------------------------- |
| `npm run build`      | Builds the project for production.  |
| `npm run build:dev`  | Builds the project for development. |
| `npm run dev-server` | Starts the development server.      |
| `npm run lint`       | Checks the code for linting issues. |
| `npm run lint:fix`   | Fixes linting issues automatically. |
| `npm run start`      | Starts the add-in in Word.          |
| `npm run stop`       | Stops the debugging session.        |
| `npm run validate`   | Validates the manifest file.        |

## Dependencies

### Runtime Dependencies

- **[@fluentui/react-components](https://www.npmjs.com/package/@fluentui/react-components)**: Fluent UI React components.
- **[@fluentui/react-icons](https://www.npmjs.com/package/@fluentui/react-icons)**: Fluent UI React icons.
- **[react](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[react-dom](https://reactjs.org/)**: React DOM renderer.
- **[file-saver](https://www.npmjs.com/package/file-saver)**: Save files from the browser.

### Development Dependencies

- **[webpack](https://webpack.js.org/)**: Module bundler.
- **[typescript](https://www.typescriptlang.org/)**: TypeScript for type checking.
- **[eslint-plugin-office-addins](https://www.npmjs.com/package/eslint-plugin-office-addins)**: Linting rules for Office Add-ins.

For the full list, refer to the `package.json` file.

## Development

### Debugging

You can debug the add-in in Word Desktop or Word Online. Use the following commands:

- Start debugging in Word Desktop:

  ```bash
  npm run start:desktop
  ```

- Start debugging in Word Online:

  ```bash
  npm run start:web
  ```

### Building

To create a production build, run:

```bash
npm run build
```

### Linting

Check for linting issues:

```bash
npm run lint
```

Automatically fix linting issues:

```bash
npm run lint:fix
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
