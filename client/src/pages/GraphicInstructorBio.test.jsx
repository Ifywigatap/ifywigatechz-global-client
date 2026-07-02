import { render, screen } from '@testing-library/react';
import GraphicInstructorBio from './GraphicInstructorBio';
import '@testing-library/jest-dom';

describe('GraphicInstructorBio', () => {
  it('renders instructor details correctly', () => {
    const mockInstructor = {
      name: 'Sarah Adebayo',
      role: 'Lead Designer @ Ifywigatechz',
      rating: 4.9,
      reviewCount: 127,
      image: '/courses/graphic-design.jpg',
      bio: 'Sarah has trained 500+ designers.'
    };

    render(<GraphicInstructorBio instructor={mockInstructor} />);

    expect(screen.getByText('Sarah Adebayo')).toBeInTheDocument();
    expect(screen.getByText('Lead Designer @ Ifywigatechz')).toBeInTheDocument();
    expect(screen.getByText(/127 reviews/)).toBeInTheDocument();
  });
});