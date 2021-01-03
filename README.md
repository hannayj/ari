# Everyday helper - Arjen apuri ARI

This React Native project is my final project of React Native course in Haaga-Helia University of Applied Sciences. It combines recipe book, weekly menus and shopping lists for menus all in one package.

The app is done with [Expo platform](https://expo.io/) and done mainly with [basic React Native components and API's](https://reactnative.dev/). The databased used in the app is realtime and noSQL database [Firebase by Google](https://firebase.google.com/).

The recipes can be brought to the app straight from the Internet just by giving the recipes URL. The API used to convert the recipes to JSON-format is [MyCookbook.io API](https://rapidapi.com/mycookbook/api/mycookbook-io1) used via Rapidapi.

## Running the app
In order to test the app you need to establish the keys to the database and MyCookbook API in a app.congif.js-file - see app.config.sample.js for instructions. After that it's just _expo start_ in the folder with the files.