const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  // console.log("hi!");
  // let variable = 5;
  // console.log(variable);
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0xb492bd656a683ebc78e2f18a42098d853f00255412ca3d2f0e4efbe69d76d086",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.Contract(abi, binary, wallet);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
