# Online Library System API in Nest.js

This project is a simple online library system that allows users to view and filter books by categories, authors, price ranges and release date ranges.

Also allows admins to login and register other admins, and they can create books and add them to the system, also they can update any book by entering the fields to be updated.

This system supports claim-based authorization with admin and user roles.



## Steps to run
### Environment Variables
First create a .env file and add the needed environment variables to it.
<br>
There's a sample version .env file which contains all the required environment variables including:
<ul>
<li> PostgreSQL database variables
<li> JWT secret
<li> Password encryption salt 
</ul>

### Docker
I've created a docker compose file to run PostgreSQL and it takes environment variables from .env file.
You can use a hosted database version of PostgreSQL by modifying the .env file and ignoring this Docker compose file.
The following command can be used to create a Docker Container.
``` 
docker-compose up -d 
```

### Database
It is recommended to import the database dump found.
The one that worked for me was the tar dump (dump-online-library-system-202308131254.tar).
This dump has some roles and claims so that the application becomes easier to be tested.

users credentials:
readers:
  email: test1
  pass: test

admin_books:
  email: test2admin
  pass: test

### NPM commands
This project was built using TypeScript enforces us to build the project before running (for production version)
To build the project.
```
npm run build
```

To start the built project.
```
npm run start:prod
```

To Run the project in development mode.
```
npm run start:dev
```

To lint the project.
```
npm run lint
```

To format the project.
```
npm run format
```

## APIs
All APIs are found in the insomnia package called online-library-system-package.json provided in the root folder

### POST auth/signup
This endpoint has no authorization and any user can register himself

### POST auth/signupAdmin
This endpoint has authorization for admins only and is used to register new admins

### POST auth/login
User must login to generate a bearer access token in order to do actions that require authorization

### POST books
Admin authorized endpoint, create new book in the database
Example:
```
{
	"name": "Lost On You",
	"categories": [4],
	
	"price": 422,
	"authors": [2],
	
	"releaseDate": "2016-09-12",
	"numberOfPages": 404
}
```

### GET books
Reader (and admin) authorized endpoint, list books in the system.
This endpoint supports: pagination, filter by categories, authors, price range and release date range
Example:
```
limit: 3
page: 1
minPrice: 51
maxPrice: 800
authors: [2]
startDate: 2010-09-01
endDate: 2015-09-01
```

### GET books/:id
Reader (and admin) authorized endpoint, get certain book data.

### PATCH books/:id
Reader (and admin) authorized endpoint, update book by id, any parameters could be send.
Example:
```
{
	"price": 15,
	"authors": [2]
}
```


