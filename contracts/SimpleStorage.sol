// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint favoriteNumber;

    // Mapping is key-value pair to store data in map
    mapping(string => uint) public nameToFunction;

    struct People {
        uint favoriteNumber;
        string name;
    }

    People[] public people;

    function store(uint _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint) {
        return favoriteNumber;
    }

    function addPeople(string memory _name, uint _favoriteNumber) public {
        People memory newPerson = People(_favoriteNumber, _name);
        people.push(newPerson);
        nameToFunction[_name] = _favoriteNumber; // This will create a new entry in the nameToFunction mapping
    }
}
