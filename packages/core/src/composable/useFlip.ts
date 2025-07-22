import { flipManager } from '../core'
import type { FlipManager } from '../types'

/**
 * Returns the VueFlip instance. Equivalent to import it directly
 */
export function useFlip (): FlipManager {
  return flipManager
}
