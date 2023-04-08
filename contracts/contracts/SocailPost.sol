// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocailPost {

    uint256 PostIdCounter;
    struct Post {
        string postIpfsHash;
        address user;
        uint256 dateTIme;
    }
    event newPost(string postIpfsHash, address user, uint256 dateTime);
    mapping(uint256=> Post) post;
    Post[]  public Posts;

    function AddPost(Post calldata _post) public {
        
            PostIdCounter++;
            
        Posts.push(_post);
        post[PostIdCounter]= _post;
        emit newPost(_post.postIpfsHash, _post.user, _post.dateTIme);
    }


    function getPostbyId(uint256 Id) public view returns (Post memory) {
        require(post[Id].user != address(0),"no post availabe");
        return post[Id];
                

    }

    function getAllPosts() public view returns(Post[] memory){
        return Posts;
    }
}
