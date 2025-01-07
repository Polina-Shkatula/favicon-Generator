# Favicon Generator

A tool to generate customizable favicons.

## Description

This application allows users to upload an image and customize various settings such as background color, corner radius, and selecting a different image for each format. Users can download the result as a ZIP archive of the entire project with 6 formats, or a single selected format. There is also an option to export and import local storage as JSON.

## Features

- Upload and preview images
- Adjust corner radius, background color and image replacement
- Generate favicons in six formats and download all generated files in a ZIP archive
- Projects history page
- Find the desired project using the search
- Edit the selected format or the entire project and download in a ZIP archive
- Export/import local storage
- Ability to switch between two modes (dev / stage)

## Technologies

- Vue.js 3
- JavaScript
- Vite
- Tailwind CSS

## Note

The component DynamicGeneration is not used in the project but is intended to create and render elements based on dynamically changing parameters, input data or states.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
