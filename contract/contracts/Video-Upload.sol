//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract VideoStorage {
    uint256 public videosCount = 0;

    mapping(address => Video[]) public videos;
    mapping(address => VideoBought[]) public purchasedVideos;

    struct Video {
        uint256 id;
        string name;
        string teaser_hash;
        string video_hash;
        string description;
        address payable owner;
        uint256 price;
        uint256 created_at;
        uint256 updated_at;
    }
    event VideoUploaded(
        uint256 id,
        string name,
        string teaser_hash,
        string video_hash,
        string description,
        address owner,
        uint256 price,
        uint256 created_at,
        uint256 updated_at
    );

    struct VideoBought {
        uint256 id;
        string teaser_hash;
        string video_hash;
        uint256 price;
        uint256 created_at;
    }
    event VideoBoughtEvent(
        uint256 id,
        string teaser_hash,
        string video_hash,
        uint256 price,
        uint256 created_at
    );

    constructor() {}

    function uploadVideo(
        string memory _teaser_hash,
        string memory _video_hash,
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        require(
            bytes(_teaser_hash).length > 0 || bytes(_video_hash).length > 0
        );
        require(bytes(_name).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0));
        uint256 length = videos[msg.sender].length + 1;
        videos[msg.sender].push(
            Video(
                length,
                _name,
                _teaser_hash,
                _video_hash,
                _description,
                payable(msg.sender),
                _price,
                block.timestamp,
                block.timestamp
            )
        );
        videosCount++;
        emit VideoUploaded(
            length,
            _name,
            _teaser_hash,
            _video_hash,
            _description,
            payable(msg.sender),
            _price,
            block.timestamp,
            block.timestamp
        );
    }

    function getMyUploadedVideos() public view returns (Video[] memory) {
        return videos[msg.sender];
    }

    function findUploadedVideosById(address _owner)
        public
        view
        returns (Video[] memory)
    {
        return videos[_owner];
    }

    function buyVideo(uint256 _index, address _owner) public payable {
        require(msg.sender != address(0));
        require(msg.value > 0);
        require(_index < videos[_owner].length);
        Video[] memory ownerVideos = videos[_owner];
        Video memory video = ownerVideos[_index];
        require(ownerVideos[_index].owner != _owner);
        require(video.price <= msg.value);
        // VideoBought[] memory myPurchasedVideos = purchasedVideos[msg.sender];
        payable(_owner).transfer(msg.value);
        uint256 length = purchasedVideos[msg.sender].length + 1;
        purchasedVideos[msg.sender].push(
            VideoBought(
                length,
                video.teaser_hash,
                video.video_hash,
                video.price,
                block.timestamp
            )
        );
        emit VideoBoughtEvent(
            length,
            video.teaser_hash,
            video.video_hash,
            video.price,
            block.timestamp
        );
    }

    function getMyPurchasedVideos() public view returns (VideoBought[] memory) {
        return purchasedVideos[msg.sender];
    }
}
