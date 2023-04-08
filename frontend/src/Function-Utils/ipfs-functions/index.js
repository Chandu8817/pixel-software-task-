// import { create } from 'ipfs-http-client'
import axios from 'axios';
// import * as IPFS from 'ipfs-core'
// import { Buffer } from 'buffer';
// import { json } from 'react-router-dom';

// // @ts-ignore
// window.Buffer = Buffer;

// const projectId = '...';
// const projectSecret = '...';
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
// const client = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   apiPath: '/api/v0',
//   headers: {
//     authorization: auth,
//   }
// })


 export async function PostMetadataToIPFS(data){



   

    if(data){
     
        try {
            
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("image", data.image);
            formData.append("tags", data.tags);

            const metaData = JSON.stringify({
             
              "pinataContent": data
            });
            

    
let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NmM1ZjEzMC1lZTdmLTQ1OGMtOTdhOC1jZWI2NDg2OGNkNjUiLCJlbWFpbCI6InZpcmVuZHJha2Fwb29yNDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZiZjZjNDk5NTUwNTc0ODY5Nzc5Iiwic2NvcGVkS2V5U2VjcmV0IjoiN2E5ZTBhZjdmZjRhOTM1NmNmMmNkNDYyMTJhMDk3Y2JkNzRmZGFmZWFjYWY1MGY1NTY4MWRiZWI4YTE5MjE0MyIsImlhdCI6MTY4MDg5MjI3OX0.UO5041C0dDNnkl_B5KP97eUUPWTdqr6-L-6KeAU8b1I"

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${jwt}`
  },
  data : metaData
};

const res = await axios(config);





  
      
      
      
      console.log(res.data);

    const metaDataHash = `${res.data.IpfsHash}`;
         
         return metaDataHash;
}catch(error){
    console.log(error)
}
}
}



export const sendFileToIPFS = async (fileImg) => {

    if (fileImg) {
        try {

            const formData = new FormData();
            formData.append("file", fileImg);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
         
         return ImgHash;
//Take a look at your Pinata Pinned section, you will see a new file added to you list.   



        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }
}

// API Key: 67877173e6eea6f959af
//  API Secret: 0db9fd2c3bf540cb2d8d27438b85d875a10c7edffe72f63db98543bdf8027e6e
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NmM1ZjEzMC1lZTdmLTQ1OGMtOTdhOC1jZWI2NDg2OGNkNjUiLCJlbWFpbCI6InZpcmVuZHJha2Fwb29yNDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY3ODc3MTczZTZlZWE2Zjk1OWFmIiwic2NvcGVkS2V5U2VjcmV0IjoiMGRiOWZkMmMzYmY1NDBjYjJkOGQyNzQzOGI4NWQ4NzVhMTBjN2VkZmZlNzJmNjNkYjk4NTQzYmRmODAyN2U2ZSIsImlhdCI6MTY4MDg3NjMxOH0.mwBmYKXwcD7fCtRC2CVbOJR0dmhF7krjNlfzL7fywhY



