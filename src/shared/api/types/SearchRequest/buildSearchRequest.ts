import { FilterType } from '../Filter'
import { SearchRequestFilter } from './SearchRequestFilter'

export const buildSearchRequest = (
	filters: Record<string, string[]>
): SearchRequestFilter[] => {
	return Object.entries(filters).map(([id, optionsIds]) => ({
		id,
		type: FilterType.OPTION,
		optionsIds
	}))
}
