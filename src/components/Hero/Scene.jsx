import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function StarParticles(props) {
  const ref = useRef();
  
  // Create 5000 random points in a sphere
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#1A56DB"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarParticles />
      </Canvas>
    </div>
  );
}
