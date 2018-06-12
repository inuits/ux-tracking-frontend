# UX Tracking Frontend
Ux Tracking Frontend is an Angular 4+ web application based on the [CoreUI Free Admin Template](https://github.com/coreui/coreui-free-angular-admin-template). It's one component out of three needed for the Ux-tracker to work.

- [Backend](https://github.com/inuits/ux-tracking-backend)
- Dashboard
- [Library](https://github.com/inuits/ux-tracking-library)


## Getting Started

Download and install requirements.
```bash
git clone https://github.com/inuits/ux-tracking-frontend.git
cd ux-tracking-frontend
yarn [install]
```

The config is provided through a json file in `/assets/config/env_vars.json`.  
Copy the dist file over from `/assets/config/env_vars.json.dist` to get started.
```json
{
  "baseUrl": "https://localhost:5000",
  "appName": "appNameHere",
  "apiKey": "apiKeyHere"
}
```

Run the project.
```bash
ng serve [-o]
```

This will run on port 4200 by default.
`-o` will automatically open your browser on the dashboard

For more info please checkout the [Wiki](https://github.com/inuits/ux-tracking-frontend/wiki)
