import { useGitHubData } from '../../hooks/useGitHubData';
import HeroText from './HeroText';

export default function Hero() {
  const { data: visibility } = useGitHubData('visibility.json');

  if (visibility && !visibility.hero) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-transparent overflow-hidden">
      <HeroText />
    </section>
  );
}
