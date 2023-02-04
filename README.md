# SdaJavascriptRemoteLt1Angular

### Intro
This contains the Angular Project developed with Sda Javascript Remote 1 Group.

### Requirements
- node 14 or 16
- nvm for better management of multiple node versions
- everything else in the package.json

### Launch procedure:
- git clone https://github.com/MindaugasBernatavicius/SdaJavascriptRemote1AngularWithJsonServer.git
- cd SdaJavascriptRemote1AngularWithJsonServer
- nvm use $(cat .nvmrc)
- npm install
- ng serve
- npm install -g json-server
- json-server --watch data\db.json (if you are using gitbash or linux use: json-server --watch data/db.json)
