import { BigNumber } from 'ethers';
import { string } from 'yup';

import {
  MergeParty_goerli,
  ECNAnniversary_4_goerli,
  ExpressSBT_goerli,
} from './Goerli_Deploy';
import {
  MergeParty_optimism,
  ECNAnniversary_4_optimism,
  ExpressSBT_optimism,
} from './Optimism_Deploy';
import { MergeParty_init, Anniversary_init } from './Optimism_init';

export const contract_goerli_deploy = async (
  merge_mekleRoot: string,
  merge_baseUri: string,
  anni4_baseUri: string,
  approver: string,
  sbt_levels: BigNumber[]
) => {
  await MergeParty_goerli(merge_mekleRoot, merge_baseUri);
  await ECNAnniversary_4_goerli(anni4_baseUri);
  await ExpressSBT_goerli(approver, sbt_levels);
};

export const contract_optimism_deploy = async (
  approver: string,
  sbt_levels: BigNumber[],
  ecn_4th_baseUri: string
) => {
  await MergeParty_optimism();
  await ECNAnniversary_4_optimism(ecn_4th_baseUri);
  await ExpressSBT_optimism(approver, sbt_levels);
};

export const contract_optimism_init = async (
  mergeParty_address: string,
  anni4_address: string,
  merge_mekleRoot: string,
  merge_baseUri: string,
  anniver_receivers: string[]
) => {
  await MergeParty_init(mergeParty_address, merge_mekleRoot, merge_baseUri);
  await Anniversary_init(anni4_address, anniver_receivers);
};
