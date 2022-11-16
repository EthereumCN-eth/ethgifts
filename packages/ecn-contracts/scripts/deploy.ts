import * as config from './config';
import { contract_goerli_deploy } from './index';

(async () => {
  contract_goerli_deploy(
    config.MergeParty_config.goerli.merkleRoot,
    config.MergeParty_config.goerli.baseUri,
    config.ECNAnniversary_4_config.goerli.merkleRoot,
    config.ECNAnniversary_4_config.goerli.baseUri,
    config.ExpressSBT_config.goerli.Approver,
    config.ExpressSBT_config.goerli.sbt_levels
  );
})();
