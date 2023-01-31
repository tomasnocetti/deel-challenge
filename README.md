# DEEL BACKEND TASK

## Data Models

> **All models are defined in src/model.js**

### Profile

A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract

A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job

contractor get paid for jobs by clients under a certain contract.

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

## APIs To Implement

Below is a list of the required API's for the application.

1. **_GET_** `/contracts/:id` Returns the contract only if it belongs to the profile calling.

1. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**. The user is the associated with the profile_id header.

1. **_POST_** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance. The paying user is the associated with the profile_id header.

1. **_POST_** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range. Eg:

```
GET admin/best-profession?start=2020-01-03&end=2022-01-03

{"earnings":2020,"profession":"Programmer"}
```

1. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.

```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

# Resolution

## Run

To start the server you need to run.

```
npm start
```

## Tests

Tests serve as documentation for this endpoints, a whole suite of tests have been created and can be executed with:

```
npm run test
```

Tests are located under `/tests` folder. There is a test coverage of %94.84.

## Assumptions

- If the profileId in `/contracts/:id` doesn't match the contracts associated profile, we return 404.
- For both **_GET_** `/jobs/unpaid` and **_POST_** `/jobs/:job_id/pay` the user for the action is taken from getProfile middleware.
- In the operation **_POST_** `/balances/deposit/:userId`, the deposit action is considered when calling the endpoint, there's no restriction over the total balance of the client. Also a payload definition needs to be sent with the amount to deposit. Eg:

```
POST /balances/deposit/1
{
    amount: 200
}
```

- A new endpoint **_GET_** `/balance/:userId` has been created to get the balance of a user.
- I have kept the payload structure requested by the problem, but there is no validation for the `/balance/deposit/:userId` endpoint for which user is depositing. The user is specified in the url. For security the user should be validated.

## Future Improvements

- A test-db should be implemented only for running tests due to the fact that tests re-create the database when needed to have a deterministic behaviour. Also it would be nice to dockerize the server in a way to create needed assets on container start-up.
- A correct production-logging library should be implemented.
- For certain endpoints transactions have been used, it would be nice to add concurrent tests to check against race conditions, specially for pay/deposit endpoints.
- For production software it would be nice to implement clustering.
- Adding Swagger style documentation would be a really nice-to have for this project.
- Some validations have been created, and some are missing. There were no requirements on validations so this was up to the programmer to decide.
