import { Helmet } from 'react-helmet-async'
import HeroSection from './HeroSection';
import CoursePreviewSection from './CoursePreviewSection';
import VideoSection from './VideoSection';
import TopCategoriesSection from './TopCategoriesSection';
import WhyChooseSection from './WhyChooseSection';
import CtaSection from './CtaSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>IFYWIGATECHZ GLOBAL SERVICES</title>
        <meta property='og:title' content='IFYWIGATECHZ GLOBAL SERVICES — Portfolio' />
        <meta property='og:description' content='Portfolio, blog, and learning hub by Isu Ifeanyichukwu Oko (Ifywigatechz Academy).' />
        <meta property='og:url' content='https://ifywigatechz.com' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='IFYWIGATECHZ GLOBAL SERVICES' />
        <meta property='og:image' content='/logo.jpg' />
      </Helmet>

      <HeroSection />
      <VideoSection />
      <CoursePreviewSection />
      <TopCategoriesSection />
      <WhyChooseSection />
      <CtaSection />
    </>
  );
}