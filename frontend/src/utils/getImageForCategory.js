export const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

export const getImageForCategory = (category) => {
  if (!category) return DEFAULT_EVENT_IMAGE;
  
  const normalizedCat = category.toLowerCase();

  if (normalizedCat.includes('health') || normalizedCat.includes('blood') || normalizedCat.includes('medical')) {
    // Health / Blood Donation
    return 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }
  
  if (normalizedCat.includes('environment') || normalizedCat.includes('plant') || normalizedCat.includes('tree') || normalizedCat.includes('clean')) {
    // Environment / Tree Plantation
    return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }
  
  if (normalizedCat.includes('education') || normalizedCat.includes('teach') || normalizedCat.includes('kid') || normalizedCat.includes('school')) {
    // Education / Teaching
    return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }
  
  if (normalizedCat.includes('animal') || normalizedCat.includes('pet') || normalizedCat.includes('dog') || normalizedCat.includes('rescue')) {
    // Animal Welfare
    return 'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }
  
  if (normalizedCat.includes('food') || normalizedCat.includes('distribut') || normalizedCat.includes('hunger') || normalizedCat.includes('meal')) {
    // Food Distribution
    return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }

  if (normalizedCat.includes('disaster') || normalizedCat.includes('relief') || normalizedCat.includes('camp') || normalizedCat.includes('emergency')) {
    // Disaster Relief
    return 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }

  if (normalizedCat.includes('community') || normalizedCat.includes('social')) {
    return 'https://images.unsplash.com/photo-1593113563332-e147ce3f7e4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  }

  // Fallback
  return DEFAULT_EVENT_IMAGE;
};
