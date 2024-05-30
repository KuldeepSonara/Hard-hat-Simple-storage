const { ethers } = require("hardhat")
const assert = require("assert")

describe("SimpleStorage", () => {
    let SimpleStorage, simpleStorageFactory
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await simpleStorageFactory.deploy()
    })

    it("should start with a favorite number of 0", async () => {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should update when we call store", async () => {
        const expectedValue = "7"
        const transactionResponse = await SimpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await SimpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("should add a new person and update the mapping", async () => {
        const name = "Alice"
        const favoriteNumber = "20"
        const transactionResponse = await SimpleStorage.addPeople(
            name,
            favoriteNumber,
        )
        await transactionResponse.wait(1)

        const person = await SimpleStorage.people(0)
        console.log("Retrieved person:", person)
        assert.equal(person.name, name)
        assert.equal(person.favoriteNumber.toString(), favoriteNumber)

        // Debugging: Log the value of the mapping entry
        const mappedValue = await SimpleStorage.nameToFunction(name)
        console.log("Mapped value:", mappedValue.toString())
        assert.equal(mappedValue.toString(), favoriteNumber)
    })

    it("should update the mapping with multiple people", async () => {
        const name1 = "Bob"
        const favoriteNumber1 = "30"
        const name2 = "Charlie"
        const favoriteNumber2 = "40"

        let transactionResponse = await SimpleStorage.addPeople(
            name1,
            favoriteNumber1,
        )
        await transactionResponse.wait(1)

        transactionResponse = await SimpleStorage.addPeople(
            name2,
            favoriteNumber2,
        )
        await transactionResponse.wait(1)

        const person1 = await SimpleStorage.people(0)
        console.log("Retrieved person1:", person1)
        assert.equal(person1.name, name1)
        assert.equal(person1.favoriteNumber.toString(), favoriteNumber1)

        const person2 = await SimpleStorage.people(1)
        console.log("Retrieved person2:", person2)
        assert.equal(person2.name, name2)
        assert.equal(person2.favoriteNumber.toString(), favoriteNumber2)

        // Debugging: Log the value of the mapping entries
        const mappedValue1 = await SimpleStorage.nameToFunction(name1)
        console.log("Mapped value1:", mappedValue1.toString())
        assert.equal(mappedValue1.toString(), favoriteNumber1)

        const mappedValue2 = await SimpleStorage.nameToFunction(name2)
        console.log("Mapped value2:", mappedValue2.toString())
        assert.equal(mappedValue2.toString(), favoriteNumber2)
    })
})
