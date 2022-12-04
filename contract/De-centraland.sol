// uint256 public landCount = 0;
// mapping(uint256 => Land) private lands;

//real-estate
pragma solidity ^0.8.13;

import "./LandNFT.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

contract DecentraLand {
    using ByteHasher for bytes;

    event ApprovalForAll(address indexed sender);
    //  @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The WorldID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The WorldID group ID (1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to prevent double-signaling
    mapping(uint256 => bool) internal nullifierHashes;

    address contractOwner;
    LandNFT tokenContract;
    uint256 public landCount = 0;
    mapping (uint256 => Land) lands;
    mapping (uint256 => Customer) customers;
    mapping(uint256 => Land []) landHistory;

    /// @param _worldId The WorldID instance that will verify the proofs
    constructor(IWorldID _worldId,LandNFT _tokenContract) {
        worldId = _worldId;
        contractOwner = msg.sender;
        tokenContract = _tokenContract;
    }

    struct Land{
        uint256 id;
        string details;
        address landOwner;
        uint256 value;
        uint256 createdAt;
        uint256 rent;
        address rentee;
    }

    struct Customer{
        uint256 id;
        string name;
        string location;
    }

    modifier onlyContractOwner {
        require(msg.sender == contractOwner);
        _;
    }

        /// @param input User's input, used as the signal. Could be something else! (see README)
    /// @param root The of the Merkle tree, returned by the SDK.
    /// @param nullifierHash The nullifier for this proof, preventing double signaling, returned by the SDK.
    /// @param proof The zero knowledge proof that demostrates the claimer is registered with World ID, returned by the SDK.
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verifyAndExecute(
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // first, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // then, we verify they're registered with WorldID, and the input they've provided is correct
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(input).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        // finally, we record they've done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // mint the nft here
        tokenContract.safeMint(msg.sender,"");
        emit ApprovalForAll(msg.sender);
    }



    function getLand (uint256 _id) external returns (Land memory){
        return lands[_id];
    } 
 
    function createLand (string memory _details,uint256 _value) external {
        Land memory p = Land(landCount,_details,msg.sender,_value,block.timestamp,0,msg.sender);
        lands[landCount] = p;
        landHistory[landCount].push(p);
        landCount++;
        tokenContract.safeMint(msg.sender,""); 
    }


    function updatePrice (uint256 _id,uint256 _price) external {
        require(_id < landCount,"Invalid id");
        Land storage p = lands[_id];
        require(p.landOwner == msg.sender,"Not your Land");
        p.value = _price;
        landHistory[_id].push(p);
    }



    //called by person buying 
    function buyLand(uint256 _id) external payable {
        Land storage p = lands[_id];
        require(msg.value >= p.value);
        p.landOwner = msg.sender;
        //transfer NFT
        // tokenContract.transferFrom(msg.sender);

    }

    

    //called by person renting 
    function rentLand(uint256 _id,uint256 rent) external{
        Land storage p = lands[_id];
        p.rentee = msg.sender;
    }

    
    /* Returns all items */
    function fetchAllLands() public view returns (Land[] memory) {
        require(landCount > 0, "No lands to fetch");
        Land[] memory items = new Land[](landCount);

        for (uint256 i = 1; i <= landCount; i++) {
            Land storage currentItem = lands[i];
            items[i - 1] = currentItem;
        }
        return items;
    }

    /* Returns only items that a user owns */
    function fetchMyLands() public view returns (Land[] memory) {
        uint256 totalItemCount = landCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (lands[i + 1].landOwner == msg.sender) {
                itemCount += 1;
            }
        }

        Land[] memory items = new Land[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (lands[i + 1].landOwner == msg.sender) {
                uint256 currentId = i + 1;
                Land storage currentItem = lands[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    
}