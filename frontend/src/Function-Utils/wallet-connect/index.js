
import Web3 from "web3"
const  ethereum = window.ethereum;
export  async function connectWallet(){

    if (typeof window.ethereum !== 'undefined') {

        
        window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum)
        const chainId = await web3.eth.getChainId()
        console.log(chainId);
        if(chainId != 80001){
            try {
                await ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: web3.utils.toHex(80001) }],
                });
              } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {
                    await ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: web3.utils.toHex(80001),
                          chainName: 'Mumbai',
                          rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                          nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC", // 2-6 characters long
                            decimals: 18,
                          },
                          blockExplorerUrls: ["https://polygonscan.com/"],
                           
                        },
                      ],
                    });
                  } catch (addError) {
                    // handle "add" error
                  }
                }
                // handle other "switch" errors
              }
        }

        return web3
      }
    
      
      
      
      
}

export  async function dissconnectWallet(){
   
     
    
    
}
