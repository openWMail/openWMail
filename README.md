# openWMail

An always free, always open-source fork of [wmail](https://github.com/Thomas101/wmail) maintained by a volunteer community.

[![Download](https://img.shields.io/github/downloads/openWMail/openWMail/total.svg)](https://github.com/openWMail/openWMail/releases)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

The missing desktop client for Gmail & Google Inbox. Bringing the Gmail & Google Inbox experience to your desktop in a neatly packaged app

[Download releases](https://github.com/openWMail/openWMail/releases) (all platforms)

[Raise an issue or request a feature](https://github.com/openWMail/openWMail/issues)

![Screenshot](https://raw.githubusercontent.com/openWMail/openWMail/master/.github/screenshot.png "Screenshot")


### Building from source

Feeling brave and want to build from source? Here's what you need to do

Firstly you need to get an OAuth client ID and secret from Google.
Visit https://console.developers.google.com to get started.
You'll need to [setup your OAuth Client ID](https://console.developers.google.com/apis/credentials) and enable the [Gmail](https://console.developers.google.com/apis/api/gmail/overview), [Google+](https://console.developers.google.com/apis/api/plus/overview) and [Identity Toolkit](https://console.developers.google.com/apis/api/identitytoolkit/overview) APIs.

To create OAuth client ID & secret, under "API Manager", choose "Create Credentials", then "OAuth client ID".
For "Application type", select "Other", and choose some name for the application, as described in these screenshots:

![Create credentials](https://raw.githubusercontent.com/openWMail/openWMail/master/.github/gdc-create-credentials.png "Create Credentials")
<br />
<br />
![Create OAuth client ID](https://raw.githubusercontent.com/openWMail/openWMail/master/.github/gdc-oauth-client-id-creation.png "Create OAuth Client ID")

Next create `src/shared/credentials.js` with your Google client ID and secret like so...

```js
module.exports = Object.freeze({
	GOOGLE_CLIENT_ID : '<Your google client id>',
	GOOGLE_CLIENT_SECRET: '<Your google client secret>'
})
```

Then run the following...

```
npm install webpack -g
npm run-script install-all
npm start
```

### Packaging Builds

To package builds. (Note packaging osx builds can only be done from osx)
```
brew install msitools
npm install
npm rebuild
npm run-script package
```

