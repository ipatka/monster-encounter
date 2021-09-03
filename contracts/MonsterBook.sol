//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

//////////////////////////////////////////////

///    *        )      )  (                (    (
///  (  `    ( /(   ( /(  )\ )  *   )      )\ ) )\ )
///  )\))(   )\())  )\())(()/(` )  /( (   (()/((()/(
/// ((_)()\ ((_)\  ((_)\  /(_))( )(_)))\   /(_))/(_))
/// (_()((_)  ((_)  _((_)(_)) (_(_())((_) (_)) (_))
/// |  \/  | / _ \ | \| |/ __||_   _|| __|| _ \/ __|
/// | |\/| || (_) || .` |\__ \  | |  | _| |   /\__ \
/// |_|  |_| \___/ |_|\_||___/  |_|  |___||_|_\|___/

//////////////////////////////////////////////

/// @title A ERC721 contract to generate random encounters based on waypoint locations
/// @author Isaac Patka
/// @notice This contract is heavily inspired by Sam Mason de Caires' Maps contract which in turn was...
///  heavily inspired by Dom Hofmann's Loot Project and allows for the on chain creation of maps and there various waypoints along the journey.
contract MonsterBook is ERC721Enumerable, ReentrancyGuard, Ownable {
    constructor() ERC721("MonsterBook", "MONSTERS") {}

    // Stores the min and max range of how many waypoints there can be in a map
    uint256[2] private waypointRange = [4, 12];

    /// @notice Pseudo random number generator based on input
    /// @dev Not really random
    /// @param input The seed value
    function _random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    /// @notice Gets a random value from a min and max range
    /// @dev a 2 value array the left is min and right is max
    /// @param tokenId a parameter just like in doxygen (must be followed by parameter name)
    /// @param rangeTuple a tuple with left value as min number and right as max
    function randomFromRange(uint256 tokenId, uint256[2] memory rangeTuple)
        internal
        pure
        returns (uint256)
    {
        uint256 rand = _random(
            string(abi.encodePacked(Strings.toString(tokenId)))
        );

        return (rand % (rangeTuple[1] - rangeTuple[0])) + rangeTuple[0];
    }

    /// @notice Generates a singular  random point either x or y
    /// @dev Will generate a random value for x and y coords with a max value of 128
    /// @param tokenId a unique number that acts as a seed
    /// @param xOrY used as a another factor to the seed
    /// @param waypointIndex the waypoint index, used a a seed factor
    function _getWaypointPoint(
        uint256 tokenId,
        string memory xOrY,
        uint256 waypointIndex
    ) internal pure returns (uint256) {
        uint256 rand = _random(
            string(
                abi.encodePacked(
                    xOrY,
                    Strings.toString(tokenId),
                    Strings.toString(waypointIndex)
                )
            )
        );

        return rand % 128;
    }

    /// @notice Constructs the tokenURI, separated out from the public function as its a big function.
    /// @dev Generates the json data URI and svg data URI that ends up sent when someone requests the tokenURI
    /// @param tokenId the tokenId
    function _constructTokenURI(uint256 tokenId)
        internal
        view
        returns (string memory)
    {
        uint256 waypointCount = getWaypointCount(tokenId);

        string memory mapName = string(
            abi.encodePacked("Monster Encounters #", Strings.toString(tokenId))
        );

        string memory monsterIdSVGs;
        for (uint256 index = 0; index < waypointCount; index++) {
            uint256 monsterId = getMonsterAtWaypoint(tokenId, index);
            uint256 ySpace = 20 * (index + 1);
            monsterIdSVGs = string(
                abi.encodePacked(
                    '<text dominant-baseline="middle" text-anchor="middle" fill="red" x="50%" y="',
                    Strings.toString(ySpace),
                    'px">',
                    getName(monsterId),
                    ' #: ',
                    Strings.toString(monsterId),
                    "</text>",
                    monsterIdSVGs
                )
            );
        }

        string memory waypointPointsSVGs;
        for (uint256 index = 0; index < waypointCount; index++) {
            uint256[2] memory coord = getWaypointCoord(tokenId, index);
            waypointPointsSVGs = string(
                abi.encodePacked(
                    '<circle fill="red" cx="',
                    Strings.toString(coord[0]),
                    '" cy="',
                    Strings.toString(coord[1]),
                    '" r="2"/>',
                    waypointPointsSVGs
                )
            );
        }

        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style="font:14px serif"><rect width="400" height="400" fill="black" />',
            monsterIdSVGs,
            '<g transform="translate(133, 260)">',
            '<rect transform="translate(-3, -3)" width="134" height="134" fill="none" stroke="white" stroke-width="2"/>',
            waypointPointsSVGs,
            "</g>",
            "</svg>"
        );

        bytes memory image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(bytes(svg))
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                mapName,
                                '", "image":"',
                                image,
                                '", "description": "Monsters are (pseudo) randomly placed on a map at the waypoints along an adventurers journey. All data is stored on chain. Use Monsters however you want and pair with your favourite adventure Loot."}'
                            )
                        )
                    )
                )
            );
    }

    /// @notice Allows someone to get the single coordinate for a waypoint given the tokenId and waypoint index
    /// @param tokenId the token ID
    /// @param waypointIndex the waypoint index
    /// @return Array of x & y coord between 0 - 128

    function getWaypointCoord(uint256 tokenId, uint256 waypointIndex)
        public
        view
        returns (uint256[2] memory)
    {
        require(_exists(tokenId), "Token ID is invalid");
        uint256 waypointCount = getWaypointCount(tokenId);
        require(
            waypointIndex >= 0 && waypointIndex < waypointCount,
            "Waypoint Index is invalid"
        );

        uint256 x = _getWaypointPoint(tokenId, "X", waypointIndex);
        uint256 y = _getWaypointPoint(tokenId, "Y", waypointIndex);

        return [x, y];
    }

    /// @notice Gets the number of waypoints for a tokenId
    /// @param tokenId the token ID
    /// @return The number of waypoints
    function getWaypointCount(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token ID is invalid");
        return randomFromRange(tokenId, waypointRange);
    }

    /// @notice Gets all waypoints for a given token ID
    /// @param tokenId the token ID
    /// @return An array of coordinate arrays each contains an x & y coordinate
    function getWaypointCoords(uint256 tokenId)
        public
        view
        returns (uint256[2][] memory)
    {
        require(_exists(tokenId), "Token ID is invalid");
        uint256 waypointCount = getWaypointCount(tokenId);
        uint256[2][] memory arr = new uint256[2][](waypointCount);

        for (uint256 index = 0; index < waypointCount; index++) {
            arr[index] = getWaypointCoord(tokenId, index);
        }

        return arr;
    }

    /// @notice Gets an enounter for a tokenId at a waypoint
    /// @param tokenId the token ID
    /// @param waypointIndex the waypoint index
    /// @return An ID of a monster encountered at a waypoint
    // function getWaypointName(uint256 tokenId, uint256 waypointIndex)
    function getMonsterAtWaypoint(uint256 tokenId, uint256 waypointIndex)
        public
        view
        returns (uint256)
    {
        require(_exists(tokenId), "Token ID is invalid");
        uint256 waypointCount = getWaypointCount(tokenId);
        require(
            waypointIndex >= 0 && waypointIndex < waypointCount,
            "Waypoint Index is invalid"
        );

        uint256 rand = _random(
            string(
                abi.encodePacked(
                    Strings.toString(tokenId),
                    Strings.toString(waypointIndex)
                )
            )
        );

        uint256 monsterId = rand % 10000; // There are 10000 different monsters
        return monsterId;
    }

    /// @notice Gets all monster encounters for a token ID at waypoints
    /// @param tokenId the token ID
    /// @return An array of IDs for monsters
    function getMonsterIds(uint256 tokenId)
        public
        view
        returns (uint256[] memory)
    {
        require(_exists(tokenId), "Token ID is invalid");

        uint256 waypointCount = getWaypointCount(tokenId);
        uint256[] memory arr = new uint256[](waypointCount);
        for (uint256 index = 0; index < waypointCount; index++) {
            uint256 monsterId = getMonsterAtWaypoint(tokenId, index);
            arr[index] = monsterId;
        }

        return arr;
    }

    /// @notice Discovers encounters layered on a map (mints a token)
    /// @param tokenId the token ID
    function discoverEncounters(uint256 tokenId) public nonReentrant {
        require(tokenId > 0 && tokenId < 9751, "Token ID invalid");
        _safeMint(_msgSender(), tokenId);
    }

    /// @notice Allows the owner to reveal encounters on a map (mints a token)
    /// @param tokenId the token ID
    function ownerDiscoverEncounters(uint256 tokenId)
        public
        nonReentrant
        onlyOwner
    {
        require(tokenId >= 9751 && tokenId < 10001, "Token ID invalid");
        _safeMint(owner(), tokenId);
    }

    /// @notice Returns the json data associated with this token ID
    /// @param tokenId the token ID
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return string(_constructTokenURI(tokenId));
    }

    string[] private languages = [
        "understands all but can't speak",
        "Deep Speech, telepathy 120 ft.",
        "Void Speech, telepathy 120 ft.",
        "Common, Draconic, Elven, Sylvan",
        "understands an ancient language, but can't speak",
        "Common, Draconic",
        "Common, Darakhul, Draconic, Dwarvish, Goblin",
        "Common, Draconic, Giant, Ignan, Infernal, Orc",
        "Celestial, Draconic"
    ];
    string[] private names = [
        "Aatxe",
        "Aboleth",
        "Aboleth, Nihilith",
        "Abominable Beauty",
        "Accursed Defiler",
        "Acid Ant",
        "Acolyte",
        "Adult Black Dragon",
        "Adult Blue Dragon"
    ];
    string[] private types = [
        "celestial",
        "aberration",
        "undead",
        "fey",
        "monstrosity",
        "humanoid",
        "dragon",
        "elemental",
        "fiend"
    ];
    string[] private subtypes = [
        "shapechanger",
        "demon",
        "elf",
        "titan",
        "devil",
        "shoth",
        "bearfolk",
        "orc",
        "goblinoid"
    ];
    string[] private alignments = [
        "Lawful Good",
        "Neutral Good",
        "Chaotic Good",
        "Lawful Netural",
        "True Neutral",
        "Chaotic Neutral",
        "Lawful Evil",
        "Neutral Evil",
        "Chaotic Evil"
    ];
    string[] private armors = [
        "natural armor",
        "clockwork armor",
        "studded leather",
        "leather armor",
        "studded leather Armor",
        "breastplate",
        "14 (natural armor), 11 while prone",
        "15 with _mage armor_",
        "natural armor, shield"
    ];

    string[] private senses = [
        "passive Perception 12",
        "darkvision 120 ft., passive Perception 20",
        "passive Perception $1",
        "darkvision 60 ft., passive Perception 14",
        "blindsight 60 ft., passive Perception 8",
        "blindsight 60 ft., darkvision 120 ft., passive Perception 21",
        "blindsight 60 ft., darkvision 120 ft., passive Perception 22",
        "blindsight 120 ft., passive Perception 20",
        "blindsight 60 ft., darkvision 120 ft., passive Perception 24"
    ];

    function pluck(
        uint256 monsterId,
        string memory keyPrefix,
        string[] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = _random(
            string(abi.encodePacked(keyPrefix, Strings.toString(monsterId)))
        );
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }

    function getLanguage(uint256 monsterId)
        public
        view
        returns (string memory)
    {
        return pluck(monsterId, "LANGUAGE", languages);
    }

    function getName(uint256 monsterId) public view returns (string memory) {
        return pluck(monsterId, "NAME", names);
    }

    function getType(uint256 monsterId) public view returns (string memory) {
        return pluck(monsterId, "TYPE", types);
    }

    function getSubtype(uint256 monsterId) public view returns (string memory) {
        return pluck(monsterId, "SUBTYPE", subtypes);
    }

    function getAlignment(uint256 monsterId)
        public
        view
        returns (string memory)
    {
        return pluck(monsterId, "ALIGNMENT", alignments);
    }

    function getArmor(uint256 monsterId) public view returns (string memory) {
        return pluck(monsterId, "ARMOR", armors);
    }

    function getSenses(uint256 monsterId) public view returns (string memory) {
        return pluck(monsterId, "SENSES", senses);
    }

    function monsterURI(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        string[13] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: red; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

        parts[1] = getName(tokenId);

        parts[2] = '</text><text x="10" y="40" class="base">';

        parts[3] = getType(tokenId);

        parts[4] = '</text><text x="10" y="60" class="base">';

        parts[5] = getSubtype(tokenId);

        parts[6] = '</text><text x="10" y="80" class="base">';

        parts[7] = getAlignment(tokenId);

        parts[8] = '</text><text x="10" y="100" class="base">';

        parts[9] = getArmor(tokenId);

        parts[10] = '</text><text x="10" y="120" class="base">';

        parts[11] = getSenses(tokenId);

        parts[12] = "</text></svg>";

        string memory output = string(
            abi.encodePacked(
                parts[0],
                parts[1],
                parts[2],
                parts[3],
                parts[4],
                parts[5],
                parts[6],
                parts[7],
                parts[8]
            )
        );
        output = string(
            abi.encodePacked(output, parts[9], parts[10], parts[11], parts[12])
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Sheet #',
                        Strings.toString(tokenId),
                        '", "description": "Monster Traits are randomized traits generated and stored on chain. Monster IDs are generated using the encounters map. Feel free to use Monster Traits in any way you want.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(output)),
                        '"}'
                    )
                )
            )
        );
        output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
