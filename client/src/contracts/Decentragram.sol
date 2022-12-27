pragma solidity ^0.8.4;

contract Decentragram {
    string public name = "Decentragram";

    struct Image {
        uint id;
        string hash;
        string description;
        uint tipAmount;
        address payable user;
    }

    mapping(uint => Image) public images;
    uint public imagesCount = 0;

    event ImageUploaded(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable user
    );

    event ImageTipped(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable user
    );

    constructor() {}

    function uploadImage(
        string memory _hash,
        string memory _description
    ) public {
        require(
            bytes(_hash).length > 0 &&
                bytes(_description).length > 0 &&
                msg.sender != address(0)
        );

        imagesCount++;
        images[imagesCount] = Image(
            imagesCount,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );

        emit ImageUploaded(
            imagesCount,
            _hash,
            _description,
            0,
            payable(msg.sender)
        );
    }

    function tipImageOwner(uint _id) public payable {
        // check balance greater than tip

        require(_id > 0 && _id <= imagesCount);

        Image memory _image = images[_id];

        payable(address(_image.user)).transfer(msg.value);

        _image.tipAmount += msg.value;

        images[_id] = _image;

        emit ImageUploaded(
            _image.id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _image.user
        );
    }
}
