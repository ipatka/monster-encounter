//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./MonsterBook.sol";

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
/// @author Isaac Patka, Dekan Brown, Sam Kuhlmann, arentweall
/// @notice This contract is heavily inspired by Sam Mason de Caires' Maps contract which in turn was...
///  heavily inspired by Dom Hofmann's Loot Project and allows for the on chain creation of maps and there various waypoints along the journey.
contract MonsterGenerator is ERC721Enumerable, ReentrancyGuard, Ownable {
    IMonsterBook monsterBook;
    constructor(address _monsterBook) ERC721("MonsterBook", "MONSTERS") {
      monsterBook = IMonsterBook(_monsterBook);
    }

    function _constructTokenURI(uint256 tokenId)
        internal
        view
        returns (string memory)
    {
        string[13] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: red; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

        parts[1] = monsterBook.getName(tokenId);

        parts[2] = '</text><text x="10" y="40" class="base">';

        parts[3] = monsterBook.getType(tokenId);

        parts[4] = '</text><text x="10" y="60" class="base">';

        parts[5] = monsterBook.getSubtype(tokenId);

        parts[6] = '</text><text x="10" y="80" class="base">';

        parts[7] = monsterBook.getAlignment(tokenId);

        parts[8] = '</text><text x="10" y="100" class="base">';

        parts[9] = monsterBook.getArmor(tokenId);

        parts[10] = '</text><text x="10" y="120" class="base">';

        parts[11] = monsterBook.getSenses(tokenId);

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
    /// @notice Returns the json data associated with this token ID
    /// @param tokenId the token ID
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return string(_constructTokenURI(tokenId));
    }

    function claim(uint256 tokenId) public nonReentrant {
        require(tokenId > 0 && tokenId < 9751, "Token ID invalid");
        _safeMint(_msgSender(), tokenId);
    }
    
    function ownerClaim(uint256 tokenId) public nonReentrant onlyOwner {
        require(tokenId > 7777 && tokenId < 10001, "Token ID invalid");
        _safeMint(owner(), tokenId);
    }
}
