import { Composition } from 'remotion'
import { MasterDemoComposition } from '../components/remotion/MasterDemoComposition'

export const RemotionRoot = () => (
  <>
    <Composition
      id="MasterDemo"
      component={MasterDemoComposition}
      durationInFrames={9000}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  </>
)
