## local development


need to overwrite .env for local devlopment; adjust env variables to suit your need(if not sure; delete other file like .env.devlopment, .env.local)



to install deps and create .env for your packages, run:
```
yarn install

```

whenever necessary to re-create .env for packages; under <b>root path</b>, run below command :
```
yarn env-gen
```

to start redis, postgres and bullboard using docker (first time may take a while): 
```
docker compose -f docker-compose.test.yml up 
```

need re-build(time-comsuming), run:
 ```docker compose -f docker-compose.test.yml up --build ```

run sbt-api: 
```
cd packages/ecn-sbt-api 
yarn dev
```

run web-api: 
```
cd packages/ecn-web-api 
yarn start
```

run discord-bot: 
```
cd packages/ecn-discord-bot
yarn dev 
```