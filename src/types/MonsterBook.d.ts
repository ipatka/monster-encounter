/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface MonsterBookInterface extends ethers.utils.Interface {
  functions: {
    "getAlignment(uint256)": FunctionFragment;
    "getArmor(uint256)": FunctionFragment;
    "getLanguage(uint256)": FunctionFragment;
    "getName(uint256)": FunctionFragment;
    "getSenses(uint256)": FunctionFragment;
    "getSubtype(uint256)": FunctionFragment;
    "getType(uint256)": FunctionFragment;
    "random(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getAlignment",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getArmor",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getLanguage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getName",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSenses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubtype",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getType",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "random", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getAlignment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getArmor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLanguage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSenses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSubtype", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getType", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "random", data: BytesLike): Result;

  events: {};
}

export class MonsterBook extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: MonsterBookInterface;

  functions: {
    getAlignment(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getAlignment(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getArmor(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getArmor(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getLanguage(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getLanguage(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getName(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getName(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getSenses(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getSenses(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getSubtype(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getSubtype(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    getType(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "getType(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    random(
      input: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "random(string)"(
      input: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;
  };

  getAlignment(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getAlignment(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getArmor(monsterId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "getArmor(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getLanguage(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getLanguage(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getName(monsterId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "getName(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getSenses(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getSenses(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getSubtype(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getSubtype(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getType(monsterId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "getType(uint256)"(
    monsterId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  random(input: string, overrides?: CallOverrides): Promise<BigNumber>;

  "random(string)"(
    input: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    getAlignment(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getAlignment(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getArmor(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getArmor(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getLanguage(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getLanguage(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getName(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getName(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getSenses(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getSenses(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getSubtype(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getSubtype(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getType(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getType(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    random(input: string, overrides?: CallOverrides): Promise<BigNumber>;

    "random(string)"(
      input: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getAlignment(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAlignment(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getArmor(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getArmor(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLanguage(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getLanguage(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getName(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getName(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSenses(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getSenses(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSubtype(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getSubtype(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getType(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getType(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    random(input: string, overrides?: CallOverrides): Promise<BigNumber>;

    "random(string)"(
      input: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAlignment(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAlignment(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getArmor(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getArmor(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLanguage(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getLanguage(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getName(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getName(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSenses(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getSenses(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSubtype(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getSubtype(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getType(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getType(uint256)"(
      monsterId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    random(
      input: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "random(string)"(
      input: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
