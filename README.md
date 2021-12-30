In deciding on my next project, I thought about ideas that could have application to my everyday life. One of the ways I enjoy spending my free time is watching movies, and as a result, I have a decent movie collection. As the formatting options for movies grows, it’s getting harder to remember if a movie I own is physical or digital, what resolution it is, etc. Naturally, I decided to build an application to catalog my library.

There are multiple apps already available for this purpose, but I decided to build mine from the ground-up with features I wanted, rather than basing it off an existing product. My first step was to create a prototype in Adobe XD. This included creating the layouts for each of the screens and interactivity. I iterated through a couple designs and landed on a final design including the following features: ability to search for movies to add to a collection, sorting a movie collection by multiple methods, search functionality within a collection, and a randomizer.

As this project was mainly a chance for me to practice my skills, I decided on using the MERN (MongoDB, Express, React, Node) stack that I’ve used in previous work for development. However, I always enjoy challenging myself, so I decided to change it up slightly and build a native mobile app, rather than web-based. I had seen a few articles and mentions of React Native, but never used it before. I decided to give it a try as I could build my app platform agnostic while continuing to hone my React skills.

Even though my prototyping began with the front-end, I’m always conscious of the back-end requirements that will be needed to display the data. Before starting the front-end development, I settled on my data model: two MongoDB schema, one for user documents and one for movies. In this setup, a user document includes an array of references to associated movie documents. This allows for multiple users to have the same movie in their library, but only requires movie data to be stored once in the database.

Once I had my data mapped out, I began development of the front-end. My process began with determining where data would be displayed in the app and if there were screens that would consume the same data points. Focusing on each piece of functionality, I created basic screen layouts and then abstracted out pieces to make reusable components.

Through iteration and functional testing, I was able to realize the design of my prototype. Along the development process, there were some key choices that I made including:
* utilizing a third-party API to obtain movie data
* housing data manipulation in the back-end for performance and security
* minimizing network requests by using React Context to pass data between screens
* responsive design and compatibility with iOS and Android
* OAuth 2.0 authentication through Google
* persistent user sessions using Expo SecureStore

I built this project using Expo to allow for easier testing and ability to deploy without going through app stores. Follow these steps to try out the app:
* download [Expo Go](https://expo.dev/client) on your phone
* access the [MovieLibrary project](https://exp.host/@cwpulver/MovieLibrary)
* while the program is built for iPhones, Apple App Store policy no longer allows the program to be accessed publicly

