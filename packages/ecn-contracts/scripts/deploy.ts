import * as config from './config';
import hre from 'hardhat';
import {
  ECNAnniversary_4_optimism,
  ExpressSBT_optimism,
  MergeParty_optimism,
  Translation_optimism,
} from './deploy/Optimism_Deploy';
import { Anniversary_init, MergeParty_init } from './doSomething/Optimism_init';
import { ExpressSBT_goerli, Translation_goerli } from './deploy/Goerli_Deploy';

(async () => {
  // contract_goerli_deploy(
  //   config.MergeParty_config.goerli.merkleRoot,
  //   config.MergeParty_config.goerli.baseUri,
  //   config.ECNAnniversary_4_config.goerli.baseUri,
  //   config.ExpressSBT_config.goerli.Approver,
  //   config.ExpressSBT_config.goerli.sbt_levels
  // );
  // const [deployer] = await hre.ethers.getSigners();
  // console.log('deployer: ', deployer.address);
  // const anniversary_address = await ECNAnniversary_4_optimism(
  //   config.ECNAnniversary_4_config.optimism.baseUri
  // );
  // await Anniversary_init(
  //   anniversary_address,
  //   config.ECNAnniversary_4_config.optimism.receivers
  // );
  // const mergePary_address = await MergeParty_optimism();
  // await MergeParty_init(
  //   mergePary_address,
  //   config.MergeParty_config.optimism.merkleRoot,
  //   config.MergeParty_config.optimism.baseUri
  // );

  // await ExpressSBT_optimism(
  //   config.ExpressSBT_config.optimism.Approver,
  //   config.ExpressSBT_config.optimism.sbt_levels,
  //   config.ExpressSBT_config.optimism.initialUrl
  // );

  await Translation_optimism(config.Translation_config.optimism.initialUrl);
})();
