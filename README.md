# Steps To Run Project

## Perquisites
 - NodeJs
 - Yarn

 Project has two folder
 
    -  server_api
    -  UI_App

Install **yarn**
```sh
npm install -g yarn
```

To install **UI_App**
```sh
cd UI_App
yarn install
yarn start
```
To install **server_api**
```sh
cd server_api
npm instll
npm run dev-start
```

> Note: Wait till you see the log in terminal `Connection with Mongo is formed`
> This is because the mongodb instance is shared cloud instance and it is slow to connect.

After React app is started 
[React Site] `<-- click`

**Node Js ULR** `http://localhost:8080`


[React Site]: <http://localhost:3000/login>