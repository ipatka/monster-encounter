import { ethers } from "hardhat";


import { MonsterBook } from '../src/types/MonsterBook'


async function main() {
  const accounts = await ethers.getSigners();
  
  const MonsterBook = await ethers.getContractFactory('MonsterBook')
  const monsterBook = (await MonsterBook.deploy()) as MonsterBook

  await monsterBook.discoverEncounters(200)
  const uri = await monsterBook.tokenURI(200)
  console.log({uri})
  
  const monsterIds = await monsterBook.getMonsterIds(200)

  for (let index = 0; index < monsterIds.length; index++) {
    const monsterURI = await monsterBook.monsterURI(monsterIds[index])
    console.log({monsterURI})
    
  }
  
  // const Greeter = await ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  // await greeter.deployed();

  // console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
