import { connectWallet } from "../wallet-connect";
import abi  from "../../assets/ABI/socialPostAbi.json"

export async function ContractMethods(){

    const web3= await connectWallet()
    const socialContract =  new web3.eth.Contract(abi,"0x7A5d8438Bf6131cb4E991d71403e38061EECC42a")
 
return socialContract
    
    
}
export async function AddNewPost(metaUrl){
    const socialContract = await ContractMethods()
    const web3= await connectWallet()
    const account = await web3.eth.getAccounts()
    const timestamp = Math.floor(Date.now()/1000)
   const respone = await  socialContract.methods.AddPost([metaUrl,account[0],timestamp]).send({from:account[0]})
   return respone
}

export async function getAllPost(){
    const socialContract = await ContractMethods()
    const web3= await connectWallet()
    const account = await web3.eth.getAccounts()
    const timestamp = Math.floor(Date.now()/1000)
   const posts = await  socialContract.methods.getAllPosts().call()
   return posts
}