## Description
Simple service to retrieve an OAuth token

## Installation

```bash
$ npm install
```

## Running locally
0. Create a GitHub OAuth app. See [docs](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).
   This will give you a `clientId` and `clientSecret` for the next steps.
1. Create a `.env.local` file in the root of the project (same path as `package.json`) with the following variables:
```dotenv
CLIENT_ID="<OAuth client ID>"
CLIENT_SECRET="<OAuth client secret from step 0>"
```
2. Run `npm install`
3. Run `npm start` or `npm run start:dev` to run in watch mode


## Available endpoints
`POST /token` - Retrieves OAuth token

### Example

```sh
// Request

POST /token
{
  "clientAuthCode": "88731c22113b3bcd480b"
}

// Response

{
  "accessToken": "gho_avfbegOMF9OTuDLUDS7t0HFAeFrKaJ4KvZTV"
}
```
