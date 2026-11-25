import { sameTag, type SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  enableBarrelLess: true,
  modules: { 'src/app/domains/<domain>': ['domain:<domain>'] },
  depRules: { root: '*', 'domain:*': [sameTag, 'domain:shared'] },
};
