/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IMonsterBook } from "./IMonsterBook";

export class IMonsterBookFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMonsterBook {
    return new Contract(address, _abi, signerOrProvider) as IMonsterBook;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getAlignment",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getArmor",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getLanguage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getSenses",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getSubtype",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "monsterId",
        type: "uint256",
      },
    ],
    name: "getType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "input",
        type: "string",
      },
    ],
    name: "random",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
