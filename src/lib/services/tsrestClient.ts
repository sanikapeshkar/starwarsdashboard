import { initQueryClient } from '@ts-rest/react-query'
import { contract, starshipContract } from './starships.contract'

export const tsRestClient = initQueryClient(contract, {
  baseUrl: 'https://swapi.tech/api',
  baseHeaders: {},
})

export const py4eClient = initQueryClient(starshipContract, {
  baseUrl: 'https://swapi.py4e.com/api',
  baseHeaders: {},
});