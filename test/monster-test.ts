import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'
import { use, expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import {MonsterBook} from "../src/types/MonsterBook"
import { ContractFactory } from 'ethers'
import { MonsterSpawn } from '../src/types/MonsterSpawn'
import { MonsterMaps } from '../src/types/MonsterMaps'

use(solidity)

describe('Monsters', function () {
  
  let MonsterBook: ContractFactory
  let monsterBook: MonsterBook
  
  let MonsterSpawn: ContractFactory
  let monsterSpawn: MonsterSpawn
  let monsterSpawnAsAlice: MonsterSpawn

  let MonsterMaps: ContractFactory
  let monsterMaps: MonsterMaps
  let monsterMapsAsAlice: MonsterMaps

  let signers: SignerWithAddress[]

  let deployer: SignerWithAddress
  let alice: SignerWithAddress

  let deployerAddress: string
  let aliceAddress: string
  
  this.beforeAll(async function() {
    MonsterBook = await ethers.getContractFactory('MonsterBook')
    MonsterSpawn = await ethers.getContractFactory('MonsterSpawn')
    MonsterMaps = await ethers.getContractFactory('MonsterMaps')
    signers = await ethers.getSigners()
    
    deployer = signers[0]
    alice = signers[1]
    
    deployerAddress = deployer.address
    aliceAddress = alice.address
    
    monsterBook = (await MonsterBook.deploy()) as MonsterBook
    monsterSpawn = (await MonsterSpawn.deploy(monsterBook.address)) as MonsterSpawn
    monsterSpawnAsAlice = await monsterSpawn.connect(alice)
    monsterMaps = (await MonsterMaps.deploy(monsterBook.address)) as MonsterMaps
    monsterMapsAsAlice = await monsterMaps.connect(alice)

  })
  
  describe('Monster Book', function () {
    it('Gives monsters names with the in the middle', async function () {
      for (let index = 0; index < 20; index++) {
        const name = await monsterBook.getName(index)
        console.log({name})
        expect(name.split(' ').length).to.be.gte(5)
      }
    })
  })
  
  describe('Monster Spawn', function() {
    it('Allows anyone to claim ids under 9751', async function() {
      await monsterSpawn.claim(1)
      await monsterSpawnAsAlice.claim(2)
      await monsterSpawnAsAlice.claim(3)
      expect(await monsterSpawn.ownerOf(1)).to.equal(deployerAddress)
      expect(await monsterSpawn.ownerOf(2)).to.equal(aliceAddress)
      expect(await monsterSpawn.ownerOf(3)).to.equal(aliceAddress)
    })

    it('Allows owner to claim over 9751', async function() {
      await monsterSpawn.ownerClaim(9751)
      await monsterSpawn.ownerClaim(9752)
      await monsterSpawn.ownerClaim(10000)
      expect(await monsterSpawn.ownerOf(9751)).to.equal(deployerAddress)
      expect(await monsterSpawn.ownerOf(9752)).to.equal(deployerAddress)
      expect(await monsterSpawn.ownerOf(10000)).to.equal(deployerAddress)
    })

    it('Does not allow anyone else to claim over 9571', async function() {
      expect(monsterSpawnAsAlice.claim(9753)).to.be.revertedWith("Token ID invalid")
      expect(monsterSpawnAsAlice.ownerClaim(9753)).to.be.revertedWith("Ownable: caller is not the owner")
      expect(await monsterSpawn.ownerOf(9751)).to.equal(deployerAddress)
    })
  })

  describe('Monster Maps', function() {
    it('Allows anyone to claim ids under 9751', async function() {
      await monsterMaps.discoverEncounters(1)
      await monsterMapsAsAlice.discoverEncounters(2)
      await monsterMapsAsAlice.discoverEncounters(3)
      expect(await monsterMaps.ownerOf(1)).to.equal(deployerAddress)
      expect(await monsterMaps.ownerOf(2)).to.equal(aliceAddress)
      expect(await monsterMaps.ownerOf(3)).to.equal(aliceAddress)
    })

    it('Allows owner to claim over 9751', async function() {
      await monsterMaps.ownerDiscoverEncounters(9751)
      await monsterMaps.ownerDiscoverEncounters(9752)
      await monsterMaps.ownerDiscoverEncounters(10000)
      expect(await monsterMaps.ownerOf(9751)).to.equal(deployerAddress)
      expect(await monsterMaps.ownerOf(9752)).to.equal(deployerAddress)
      expect(await monsterMaps.ownerOf(10000)).to.equal(deployerAddress)
    })

    it('Does not allow anyone else to claim over 9571', async function() {
      expect(monsterMapsAsAlice.discoverEncounters(9753)).to.be.revertedWith("Token ID invalid")
      expect(monsterMapsAsAlice.ownerDiscoverEncounters(9753)).to.be.revertedWith("Ownable: caller is not the owner")
      expect(await monsterMaps.ownerOf(9751)).to.equal(deployerAddress)
    })
  })
})

