import { ethers } from "hardhat";


import { MonsterBook } from '../src/types/MonsterBook'
import { MonsterMaps } from '../src/types/MonsterMaps'
import { MonsterSpawn } from '../src/types/MonsterSpawn'

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async function main() {
  const accounts = await ethers.getSigners();
  
  const gasPrice = 160000000000
  const gasLimit = 300000
  
  const MonsterBook = await ethers.getContractFactory('MonsterBook')
  const MonsterSpawn = await ethers.getContractFactory('MonsterSpawn')
  const MonsterMaps = await ethers.getContractFactory('MonsterMaps')
  const monsterSpawn = (await MonsterSpawn.attach('0xeCb9B2EA457740fBDe58c758E4C574834224413e')) as MonsterSpawn
  const monsterMaps = (await MonsterMaps.attach('0x6c8715ade6361d35c941eb901408efca8a20f65a')) as MonsterMaps

  const nonceStart = 6
  for (let index = 0; index < 37; index++) {
    monsterSpawn.ownerClaim(9754 + index, {gasPrice, gasLimit, nonce: nonceStart + index})
    await delay(500)
  }
  

  // await monsterMaps.discoverEncounters(201)
  // const uri = await monsterMaps.tokenURI(201)
  // console.log({uri})
  
  // const monsterIds = await monsterMaps.getMonsterIds(201)

  // for (let index = 0; index < monsterIds.length; index++) {
  //   await monsterSpawn.claim(monsterIds[index])
  //   const monsterURI = await monsterSpawn.tokenURI(monsterIds[index])
  //   console.log({monsterURI})
    
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
