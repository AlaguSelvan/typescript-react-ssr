# TypeScript React SSR Boilerplater

## Who this BoilerPlate For?

This BoilerPlate is Built for People who have trouble worrying about SEO or configuring SSR from scratch, This BoilerPlate solves all the Issues with that and It is Built to be very much similar to Create-React-App for Picking up and Working very faster.

## Requirements

- [node](https://nodejs.org/en) >= 12.13
- [npm](https://www.npmjs.com) >= 6.0

## Getting Started

**1. You can start by cloning the repository on your local machine by running:**

```sh
git clone https://github.com/AlaguSelvan/typescript-react-ssr.git
cd typescript-react-ssr
```

**2. Install all of the dependencies:**

```sh
yarn
```

**3. Start to run it:**

```sh
yarn start  # Running Client side with Dev or Prod Config.
yarn build  # Building bundle
```

The app Will Run at [http://localhost:3000](http://localhost:3000)

> Note: You can change the port that you want from `.env`.

## Script Commands

| `yarn <script>`    | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| `start`            | Runs your client at `localhost:3000`.                                            |
| `build`            | Build your production ready app.                                                 |
| `build:client`     | Build your client Files.                                                         |
| `compile:client`   | Transpile your client Files present in ./App folder.                             |
| `build:server`     | Build your server Files.                                                         |
| `compile:server`   | Transpile your server Files present in ./server folder.                          |
| `format`           | format with prettier.                                                            |
| `clean`            | Delete all your build folders.                                                   |
| `lint`             | lint your client and server Files.                                               |

## App Structure

Here is the structure of the app, which serves as generally accepted guidelines and patterns for building scalable apps.

```
.
├── public                          # Express server static path/Webpack bundled output
│   └── favicon.ico                 # Favicon is placed in the same path with the main HTML page
│   └── index.html                  # HTML File for serving Content to the Web.
│   └── logo192.png                 # logo file.
│   └── manifest.json               # Manifest file for PWA.
├── server                          # Server Side Code for serving React SSR.
│   ├── utils                       # App configuration settings
│   │   └── HtmlTemplate.ts         # JSX Rendered to static HTML.
│   ├── index.ts                    # Default Express Server for serving React app on Port 3000.
│   └── render.tsx                  # Server Side Rendering Logic Goes here
├── app                             # Client Side Code for React.
│   ├── container                   # Page components
│   ├── components                  # Isolated Components Should go Here(e.g. Button, Switch etc.)
│   ├── context                     # For using React Context API
│   ├── redux                       # For using Redux for Store
│   ├── Router                      # App-wide utils (e.g. configure Redux store, HTML template etc.)
│   ├── App                         # Static assets (e.g. images, fonts etc.)
│   └── index                       # App-wide style and vendor CSS framework
├── build                           # All Client and Server side React Code are compiled for Production.
│   ├── app                         # All Client side code compiled for Production.
│   ├── client                      # Client side Bundle to be served for Production.
│   └── server                      # All Server side code for serving production build
├── tools                           # Project related configurations (testing/build etc.)
│   └── webpack                     # Webpack settings
│       ├── client                  # Webpack configuration For Client side Dev and Prod Mode
│       └── server                  # Webpack configuration For Server Config Dev and Prod Mode
├── index.ts                        # App entry point
└── huskyrc                         # Git Pre Commit Hooks
```

### Important Information

This Boilerplate is still in Beta, It Will work fine on Development and Production, But Still some minor updates and fixes are there which will be fixed soon and This Boilerplate will be Ready for everyone.