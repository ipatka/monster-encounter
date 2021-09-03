import { ethers } from "hardhat";


import { MonsterBook } from '../src/types/MonsterBook'
import { MonsterEncounters } from '../src/types/MonsterEncounters'
import { MonsterGenerator } from '../src/types/MonsterGenerator'


async function main() {
  const accounts = await ethers.getSigners();
  
  const MonsterBook = await ethers.getContractFactory('MonsterBook')
  const MonsterGenerator = await ethers.getContractFactory('MonsterGenerator')
  const MonsterEncounters = await ethers.getContractFactory('MonsterEncounters')
  const monsterBook = (await MonsterBook.deploy()) as MonsterBook
  const monsterGenerator = (await MonsterGenerator.deploy(monsterBook.address)) as MonsterGenerator
  const monsterEncounters = (await MonsterEncounters.deploy(monsterBook.address)) as MonsterEncounters

  await monsterEncounters.discoverEncounters(200)
  const uri = await monsterEncounters.tokenURI(200)
  console.log({uri})
  
  const monsterIds = await monsterEncounters.getMonsterIds(200)

  for (let index = 0; index < monsterIds.length; index++) {
    await monsterGenerator.claim(monsterIds[index])
    const monsterURI = await monsterGenerator.tokenURI(monsterIds[index])
    console.log({monsterURI})
    
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
