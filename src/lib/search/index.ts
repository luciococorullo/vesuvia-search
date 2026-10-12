export { normalize, compact, expandVariants } from './normalize';
export { STATION_ALIASES } from './aliases';
export {
  buildIndex,
  searchIndex,
  searchIndexScored,
  searchStations,
  highlightRanges,
  damerauLevenshtein,
  MatchTier,
} from './searchStations';
export type { StationIndex, ScoredStation } from './searchStations';
