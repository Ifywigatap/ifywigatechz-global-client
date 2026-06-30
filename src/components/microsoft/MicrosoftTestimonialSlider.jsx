import TestimonialSlider from '../../pages/TestimonialSlider';
import { TESTIMONIALS } from '../../data/microsoftData';

export default function MicrosoftTestimonialSlider() {
  return (
    <TestimonialSlider testimonials={TESTIMONIALS} themeColor="blue" />
  );
}
