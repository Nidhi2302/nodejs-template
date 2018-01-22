# Node.js Template Project

## Introduction
 
This project provides structure for Node.js project used at Solution Analysts. 

Depending on project requirements it may require modification in the structure which developer can make best judgement based on project understanding.

## Table of Contents

  1. [Project setup guide](#setup)
  1. [Available Ready Modules](#modules)
  
##  Project setup guide
<a name="setup"></a>
### Prerequesites

1. Latest version of Node.js and NPM installed (For more information regarding installation, please check this link https://nodejs.org/en/download/)
2. Git installed


### Clone template code base
```
git clone http://git.sa-labs.info/sa/node-template-nodejs.git
```

### Install depedencies

As per best practise node_modules should always be in .gitignore, move to directory where you have project checkout and run below command in terminal
```
npm install 
```

### Configuration file (.env)
All enviroment configuration variables like database configuration are managed through .env file
Create .env file in project root folder as per sample.env and update values of variable as needed

### Routes
Main routes are added in route.js under root folder

Individual routes are added under modules->moduleName folder

### Config
Config folder contains different config file like database.js, config.js. Update values under config if required

### Language

Add all message in translation file under languate folder.

Example:
```
"USER_PASSWORD_REQUIRE" : "Password Required”
```

## How to run node api

## Open api in poster
```
Example
<Domain or IP Address>:<port number as in .env file>/api/v1/<apiName> -> http://192.168.1.82:5000/api/v1/demo/get_users
```


# Available Ready Modules
<a name="modules"></a>
## a. User Module
## b. Stripe Payment Module



## a. User Module

### 1. Login function

After login success call "getUserDetail() " function from controller for get secrete-token and user-details.

### 2. Register function
"userRegistration()" function from controller for user registration copy code for user registration

### 3. Update User function
"userUpdate" function from controller for update user profile password etc

### 4. Email Sent function
"sendUserEmail" function from controller for send forgot passeord ,welcome etc.

### 5. Get All User function
"getUserRows" function Get all users detail

## b. Payment
Stripe module apis are exists in payment folder 
Methods in controller: addCard,getCards,deleteCard,defaultCard,addDebitCard,getDebitCards,defaultDebitCard,deleteDebitCard
Payment api router  (Example:-> http://192.168.1.82:5000/api/v1/payment/get-card)
    
    