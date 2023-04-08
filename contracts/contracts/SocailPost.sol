// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocailPost {
    struct Post {
        string postIpfsHash;
        address user;
        uint256 dateTIme;
    }
    event newPost(string postIpfsHash, address user, uint256 dateTime);
    Post[]  public Posts;

    function AddPost(Post calldata post) public {
        Posts.push(post);
        emit newPost(post.postIpfsHash, post.user, post.dateTIme);
    }


    function getPostbyHash(string memory posthash) public view returns (Post memory) {
        uint length = Posts.length;
         bytes32 hash = keccak256(abi.encode(posthash));

        if (length > 0) {
            for (uint256 index = 0; index < length; ) {
                require(keccak256(abi.encode(Posts[index].postIpfsHash)) == hash, "no post availabe");
                if (keccak256(abi.encode(Posts[index].postIpfsHash))==hash) {
                    return Posts[index];
                }
                unchecked {
                    index++;
                }
            }
        }
        revert("no post availabe");
    }

    function getAllPosts() public view returns(Post[] memory){
        return Posts;
    }
}
