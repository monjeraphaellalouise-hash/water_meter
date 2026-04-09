import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SampleDataLoader = () => {
  const { readings, addReading } = useApp();

  useEffect(() => {
    // Only load sample data if no readings exist
    if (readings.length === 0) {
      // Add sample weekly readings for the past month
      const today = new Date();
      
      // Week 1 (3 weeks ago)
      const week1 = new Date(today);
      week1.setDate(week1.getDate() - 21);
      addReading({
        date: week1.toISOString(),
        reading: 100,
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        type: 'weekly',
      });

      // Week 2 (2 weeks ago)
      const week2 = new Date(today);
      week2.setDate(week2.getDate() - 14);
      addReading({
        date: week2.toISOString(),
        reading: 106.5,
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        type: 'weekly',
      });

      // Week 3 (1 week ago)
      const week3 = new Date(today);
      week3.setDate(week3.getDate() - 7);
      addReading({
        date: week3.toISOString(),
        reading: 113.2,
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        type: 'weekly',
      });

      // This week
      const thisWeek = new Date(today);
      addReading({
        date: thisWeek.toISOString(),
        reading: 118.5,
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
        type: 'weekly',
      });

      // Add some daily checks for the past week
      for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(day.getDate() - i);
        addReading({
          date: day.toISOString(),
          reading: 113.2 + (6 - i) * 0.9,
          imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
          type: 'daily',
        });
      }
    }
  }, []);

  return null;
};
