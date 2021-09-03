import { ethers } from "hardhat";


import { MonsterBook } from '../src/types/MonsterBook'
import { MonsterMaps } from '../src/types/MonsterMaps'
import { MonsterSpawn } from '../src/types/MonsterSpawn'


async function main() {
  const accounts = await ethers.getSigners();
  
  const MonsterBook = await ethers.getContractFactory('MonsterBook')
  const MonsterSpawn = await ethers.getContractFactory('MonsterSpawn')
  const MonsterMaps = await ethers.getContractFactory('MonsterMaps')
  const monsterBook = (await MonsterBook.deploy()) as MonsterBook
  const monsterSpawn = (await MonsterSpawn.deploy(monsterBook.address)) as MonsterSpawn
  const monsterMaps = (await MonsterMaps.deploy(monsterBook.address)) as MonsterMaps

  await monsterMaps.discoverEncounters(201)
  const uri = await monsterMaps.tokenURI(201)
  console.log({uri})
  
  const monsterIds = await monsterMaps.getMonsterIds(201)

  for (let index = 0; index < monsterIds.length; index++) {
    await monsterSpawn.claim(monsterIds[index])
    const monsterURI = await monsterSpawn.tokenURI(monsterIds[index])
    console.log({monsterURI})
    
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
