<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/JackHumphries9/Socially">
    <img src="/src/assets/icons/app-icons/png/1024x1024.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Socially</h3>

  <p align="center">
    Group all of your socials into one window!
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Releases](#releases)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Socially Screen Shot][product-screenshot]](https://getsocially.app)

Socially is an application which combines all of your social media DM's and chats into one single window. The aim of this app is to increase productivity and reduce the need for having multiple browser tabs open.

### Built With

- [Electron](https://github.com/electron/electron)
- [React.JS](https://reactjs.org)
- [Electron JSON Config](https://github.com/de-luca/electron-json-config)
- [React Toastify](https://github.com/fkhadra/react-toastify)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

First you need to install Node.JS and NPM. Then you can setup the project.

### Installation

1. Clone the repo

```sh
git clone https://github.com/JackHumphries9/Socially.git
```

2. Install NPM packages

```sh
npm install
```

If you are going to develop this project, change line 6 in the package.json to:

```json
"main": "src/electron.js",
```

and in the `src/electron.js` file, make sure that you set `isDev` to true (I will be fixing this to use the environment rather than manually):

```javascript
let isDev = true;
```

To run this project, you need to run the React server in one terminal:

```sh
npm start
```

And then run the electron app:

```sh
npm run electron
```

This repo contains two scripts (these scripts have been used on MacOS but should work on Linux):

The build script executed by:

```sh
./build.sh
```

will build the React project then copy the `src/electron.js` and `src/preload.js` files over into the build folder. From there, electron-builder is ran to compile for all platforms (this may error out on Linux due to MacOS apps not being able to be signed).

Building for MacOS may be problematic as the code was signed by me using a Provisioning profile. You may need to delete some parts of the electron-builder.json file in order to build it properly. (Possibly the provisionProfile field)

The cleanup script executed by:

```sh
./cleanup.sh
```

<!-- Releses -->

## Releases

See the [releases](https://github.com/JackHumphries9/Socially/releases/) page for all releases and to download the binaries.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/JackHumphries9/Socially/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the GNU General Public License v3.0 License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Your Name - [@JackPHumphries](https://twitter.com/JackPHumphries) - me@jackhumphries.co.uk

Project Link: [https://github.com/JackHumphries9/Socially](https://github.com/JackHumphries9/Socially)

Website Link: [https://getsocially.app](https://getsocially.app)

[product-screenshot]: https://getsocially.app/assets/img/champnew.png
