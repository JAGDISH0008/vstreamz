//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VideoStorage {
    uint256 public videosCount = 0;
    Video[] public allVideos;

    mapping(address => Video[]) public videos;
    mapping(address => VideoBought[]) public purchasedVideos;
    mapping(address => uint256) public balances;

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
        allVideos.push(
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

    function getAllVideos() public view returns (Video[] memory) {
        return allVideos;
    }

    function findUploadedVideosById(address _owner)
        public
        view
        returns (Video[] memory)
    {
        return videos[_owner];
    }

    function buyVideo(uint256 _index, address _owner) public payable {
        require(msg.sender != address(0), "You can't buy video from 0x0");
        require(msg.value > 0, "You can't buy video for 0 MATIC");
        require(_index < videos[_owner].length, "Video index is out of range");
        Video[] memory ownerVideos = videos[_owner];
        Video memory video = ownerVideos[_index];
        require(
            ownerVideos[_index].owner != _owner,
            "You can't buy your own video"
        );
        require(
            video.price <= msg.value,
            "You can't buy video for more than it's price"
        );
        balances[_owner] += msg.value;
        // VideoBought[] memory myPurchasedVideos = purchasedVideos[msg.sender];
        uint256 amount = video.price;
        address sender = msg.sender;
        address owner = video.owner;
        token.transfer(_owner, msg.value);
        // payable(_owner).transfer(msg.value);
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
