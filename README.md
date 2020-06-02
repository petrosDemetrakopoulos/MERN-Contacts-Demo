# MERN Contacts

## Project Overview
The project asked to develop is a simple Contact application allowing CRUD operations using the MERN stack (Mongo, Express, React, Node)

Each contact has the following attributes:

1) Name
2) Email
3) Address
4) Phones (can be more than one)


## Detailed specifications

* Email and phone values **should be validated**

* Delete operation **should ask for user confirmation**
  

## The API

The API is developed in Node.JS using the Express library.
The code has the following structure

    ├── config
    │   └── db.config.js
    ├── controllers
    │   └── ContactController.js
    ├── helpers
    │   └── helpers.js
    ├── models
    │   ├── Contact.js
    │   └── index.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   └── routes.js
    ├── test
    │   └── test.js
    └── server.js

### Architectural choices

* I used **Mongoose** library for the **Model layer**.

Mongoose offers a level of abstraction between the MongoDB collections and the API server making the code easier to read and to maintain. It also provides some validation and error handling mechanisms.
  
* **Controller layer** is the layer where the most part of business logic "lives in". It is the layer of the API that calls the methods of the **Model layer**, performs data validation, handles responses, etc.

* **Routes layer** is the top layer that exposes all the endpoints. It is the part where everything comes together and completes the API.

 * **Validations** of emails and phones values in the API are performed in the **Controller layer**.  Validation functions (with RegEx) are in the separate file **helpers/helpers.js**  for code readability and best practices reasons. 

### The endpoints
All the endpoints are behind the path `/api/contacts`
* GET /api/contacts/
Returns an array containing all stored contacts
* GET /api/contacts/:id
Returns the contact object corresponding to the id which is passed as a parameter
* POST /api/contacts/
Creates a new contact with the values sent in the body part of the request. If the data sent is valid, it returns the new contact, otherwise it returns the errors.
* PUT /api/contacts/:id
Updates an already existing contact corresponding to the id passed as a parameter with the data sent in the body part. It returns error if data sent is not valid or if a contact with this id does not exist.

### Tests
Test have been written for the whole functionality of the API and they are located in **test/test.js** file. You can run them by executing npm test. Tests are written with Supertest.js, Mocha.js and Chai.js libraries.

### How to run it

Type `npm install` in the API directory and wait for npm to download all the dependencies. Then type `npm start`. 
You should see the following:

    Server is running on port 8080
    Connected to the database!

Note: Make sure that a local instance of MongoDB is running in your computer. You can change the MongoDB connection configuration in the **config/db.config** file.


## The front-end (React)

The front-end part of the application is developed with React.JS. The initial project was generated using `create-react-app` generator.

The code has the following structure
    
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── APIManager.js
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── Components
    │   │   ├── Alert.js
    │   │   ├── ContactCard.js
    │   │   ├── ContactForm.js
    │   │   ├── ContactList.js
    │   │   ├── DeleteModal.js
    │   │   ├── PhoneField.js
    │   │   └── PhoneList.js
    │   ├── Context
    │   │   ├── ContactContext.js
    │   │   └── ContactReducer.js
    │   ├── Pages
    │   │   ├── ContactFormPage.js
    │   │   └── ContactListPage.js
    │   ├── index.css
    │   ├── index.js
    │   └── setupTests.js
    └── yarn.lock

 ### Architectural choices
* I used **React hooks**  and **React Context API** for the state management. React Hooks offer an alternative to writing class-based components by allowing us to handle state management from functional components. Of course it is something we could have done with react-redux library, however React hooks seems to be the modern way of handling state in React and offers much more possibilities in a more lightweight way. 

* **API Manager** layer (APIManager.js) is the layer responsible for the communication of the front-end with the API. It is the **only** part of the app where HTTP requests can be sent to the API. Each page and component that needs to consume data from the API, calls it via this layer. This layer uses the classic `fetch()` API

* **Components** directory holds all the custom components we have created. All custom components are functional. I choose functional components over class based components because 
    * They are easier to read, test and maintain
    * The are more lightweight than class based components

* **Styling**: For styling I used the **bootstrap** framework which offers many pretty components and CSS classes. In some points it was essential to write custom CSS (which I tried to do in an external CSS file and not in-line for code readability / best practices reasons)

* **Validations** of emails and phones values in the front-end are performed dynamically (as the user types in the related fields) and the app notifies the user for non-valid data with annotations in the bottom of the fields.


### How to run it

Type `npm install` in the front-end directory and wait for npm to download all the dependencies. Then type `npm start`,

Note: As previously mentioned the project was generated by `create-react-app` generator which uses `react-script`, so `react-scripts` library should be globally installed in your computer in order to run it. 
