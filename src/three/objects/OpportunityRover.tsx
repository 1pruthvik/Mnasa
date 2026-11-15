// src/three/objects/OpportunityRover.tsx
import { MERModel, type MERProps, SITE } from './SpiritRover'

export { SITE }

export default function OpportunityRover(props: Omit<MERProps, 'variant'>) {
  return <MERModel variant="opportunity" {...props} />
}
