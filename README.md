# Ux Tracker Frontend

The Ux Tracking frontend is an angular project based on [CoreUI Free Angular 2+ Admin Template](https://github.com/coreui/coreui-free-angular-admin-template).

## Installation

Install all the requirements:
```
yarn [install]
```

Run the project with:
```
ng serve [-o]
```
This will run on port 4200 by default.

## Dashboard

The dashboard is the main view of the project, this is where all the actions and errors are shown with their details.

### Actions

The actions are shown in the left card on the dashboard. When clicked, the action will slide open and shows his details.

The following details are shown:

| Name | Example |
| --- | --- |
| value | John Doe |
| type | P |
| path | /pos.html |
| method | click |
| tree | body > div:eq(1) > div:eq(7) > p |
| timestamp | 07 Jun 2018 11:31 :12 |

Also the full json object is shown.

### Errors

The errors are shown in the right card on the dashboard. When clicked, the error will slide open and shows his details.

The following details are shown:

| Name | Example |
| --- | --- |
| source | pos.html |
| position | 74,9 |
| client | clientId |
| session | sessionId |
| Date | June 7, 2018 at 11:15:56 AM GMT+2 |

A stacktrace of the error is also shown.

## Cypress tests

When working in the dashboard it is possible to generate an Cypress test of specific actions. This can be
a test with all the actions, or with actions that belong to a specific error in a range of time.

### How to run the test

To start a test you will need to install Cypress, you can do this with the following instructions:

```bash
npm install cypress -g
# Save the downloaded file in <your-path>/cypress/
cypress open -P <your-path>/cypress
# Select your test
```
For further Cypress documentation, visit: https://docs.cypress.io/guides/overview/why-cypress.html#
