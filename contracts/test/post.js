const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Social post", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
        const SocailPost = await ethers.getContractFactory("SocailPost");
        const socailPost = await SocailPost.deploy();
        return { socailPost, owner, otherAccount };
    }

    describe("Deployment", function () {

        it("Should add post and emit event new post", async function () {
            const { socailPost, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
            const time = Math.floor(Date.now() / 1000).toString()
            await socailPost.connect(otherAccount).AddPost([
                "QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw",
                otherAccount.address,
                ethers.BigNumber.from(time)

            ])
            const post = await socailPost.getPostbyHash("QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw")
            expect(post[0]).to.equal("QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw");

        });
        it("Should revert the no post message", async function () {
            const { socailPost, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);


            const time = Math.floor(Date.now() / 1000).toString()

            await expect(socailPost.getPostbyHash("QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7m")).revertedWith("no post availabe")

        });
        it("Should add post and emit event new post", async function () {
            const { socailPost, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);

            const time = Math.floor(Date.now() / 1000).toString()

            await expect(
                await socailPost.connect(otherAccount).AddPost([
                    "QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw",
                    otherAccount.address,
                    ethers.BigNumber.from(time)

                ])
            )
                .to.emit(socailPost, "newPost")
                .withArgs("QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw",
                    otherAccount.address,
                    ethers.BigNumber.from(time));

        });

        it("should return all posts",async function(){
            const { socailPost, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
            const time = Math.floor(Date.now() / 1000).toString()
            await socailPost.connect(otherAccount).AddPost([
                "QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw",
                otherAccount.address,
                ethers.BigNumber.from(time)

            ])
            await socailPost.connect(otherAccount).AddPost([
                "QmSp6LTFfhZtEei22NhrWAdtnXUB4zEdKnYVghchGAc7mw",
                otherAccount.address,
                ethers.BigNumber.from(time)

            ])
            const posts = await socailPost.getAllPosts()
            expect(posts.length).to.equal(2)
        })

    });

});
