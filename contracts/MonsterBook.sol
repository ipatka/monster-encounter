//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

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

interface IMonsterBook {
    function getLanguage(uint256 monsterId) external view returns (string memory);

    function getName(uint256 monsterId) external view returns (string memory);

    function getType(uint256 monsterId) external view returns (string memory);

    function getSubtype(uint256 monsterId) external view returns (string memory);

    function getAlignment(uint256 monsterId)
        external
        view
        returns (string memory);

    function getArmor(uint256 monsterId) external view returns (string memory);

    function getSenses(uint256 monsterId) external view returns (string memory);

    function random(string memory input) external pure returns (uint256);
}

/// @title A ERC721 contract to generate random monsters for adventurers to encounter
/// @author Isaac Patka, Dekan Brown, Sam Kuhlmann, arentweall
/// @notice This contract is heavily inspired by Sam Mason de Caires' Maps contract which in turn was...
///  heavily inspired by Dom Hofmann's Loot Project and allows for the on chain creation of maps and there various waypoints along the journey.
contract MonsterBook is IMonsterBook {
    /// @notice Pseudo random number generator based on input
    /// @dev Not really random
    /// @param input The seed value
    function random(string memory input) public pure override returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
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
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, Strings.toString(monsterId)))
        );
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }

    function getLanguage(uint256 monsterId)
        external
        view
        override
        returns (string memory)
    {
        return pluck(monsterId, "LANGUAGE", languages);
    }

    function getName(uint256 monsterId) external view override returns (string memory) {
        return pluck(monsterId, "NAME", names);
    }

    function getType(uint256 monsterId) external view override returns (string memory) {
        return pluck(monsterId, "TYPE", types);
    }

    function getSubtype(uint256 monsterId) external view override returns (string memory) {
        return pluck(monsterId, "SUBTYPE", subtypes);
    }

    function getAlignment(uint256 monsterId)
        external
        view
        override
        returns (string memory)
    {
        return pluck(monsterId, "ALIGNMENT", alignments);
    }

    function getArmor(uint256 monsterId) external view override returns (string memory) {
        return pluck(monsterId, "ARMOR", armors);
    }

    function getSenses(uint256 monsterId) external view override returns (string memory) {
        return pluck(monsterId, "SENSES", senses);
    }
}
