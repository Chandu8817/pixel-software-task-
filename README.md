# pixel-software-task-
 This project is based on socail media post using blockchain <br />
 Tech used in project react-js,node-js, hardhat for contracts, polygon testnet blockchain for deployment <br />
 Using front-end user can add new posts and see his post just after transaction is done  on same screen <br />
 All Posts are show on home page 




# node should be installed 
# hardhat deployment  
 `npm install`  for node packeges <br />
 `npx hardhat test` for test the smart contract methods <br />
 `npx harhat run ./srcipts/deploy-socialPost.js` for contract deployment local <br />
 `npx harhat run ./srcipts/deploy-socialPost.js --network mumbai` for contract deployment on testnet polygon <br />
 .env for storing private key and api keys  

# Node backend event lisnter  deployment
 `npm install`  for node packeges <br />
 `npm run dev` for run node backend API <br />
 `node ./listener.js`   for blockchain smart contract new posts logs events <br />
 .env for storing API keys 


# React frontend 
 `npm install` for node packages <br/>
 `npm start` for start react app <br/>
 .env for storing API keys <br/>

# env exmaples
Frontend 
 REACT_APP_PINATA_API_KEY="" <br/>
 REACT_APP_PINATA_API_SECRET=""<br/>
 JWT=""<br/>
Backend 
 JWT=""<br/>
Hardhat
 RPCKEY= ""<br/>
 PRIVATEKEY = ""



