import joi from 'joi';

export const baseSchema = joi.object({
  activated_users: joi.number().integer().required(),
  arch: joi.any().valid('arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x64').required(),
  database: joi.any().valid('mysql', 'postgresql', 'sqlite').required(),
  id: joi.string().required(),
  node: joi.string().pattern(/^v\d+\.\d+\.\d+$/),
  os: joi.any().valid('aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'),
  version: joi.string().pattern(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/),
})