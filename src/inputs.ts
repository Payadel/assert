import * as yaml from 'js-yaml'
import { getBooleanInputOrDefault, getInputOrDefault } from './utility'
import DefaultInputs from './configs'

export interface IInputs {
  inputsYaml: any[]
  failFast: boolean
  verbose: boolean
}

export function getInputs(): IInputs {
  const inputs = getInputOrDefault('inputs', '', true, true)

  const parsedYaml = yaml.load(inputs!)
  const parsedInputs = ensureYamlValid(parsedYaml)

  const failFast = getBooleanInputOrDefault(
    'fail-fast',
    DefaultInputs.failFast,
    false
  )!
  const verbose = getBooleanInputOrDefault(
    'verbose',
    DefaultInputs.verbose,
    false
  )!

  return {
    inputsYaml: parsedInputs,
    failFast,
    verbose
  }
}

function ensureYamlValid(parsedYaml: any): any[] {
  for (const item of parsedYaml) {
    if (!item.name)
      throw new Error(
        `The 'name' parameter is required.\nItem:\n\t${JSON.stringify(item)}`
      )
    if (!item.type)
      throw new Error(
        `The 'type' parameter is required.\nItem:\n\t${JSON.stringify(item)}`
      )
  }

  return parsedYaml
}
