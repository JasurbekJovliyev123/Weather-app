import { describe, it, expect } from 'vitest';
import { formatTemperature, capitalizeFirstLetter, formatDate } from '../utils';

describe('Utils', () => {
  it('formats temperature correctly', () => {
    expect(formatTemperature(20.5)).toBe('21°C');
    expect(formatTemperature(-5.2)).toBe('-5°C');
    expect(formatTemperature(0)).toBe('0°C');
  });

  it('capitalizes first letter correctly', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    expect(capitalizeFirstLetter('HELLO')).toBe('HELLO');
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('formats date correctly', () => {
    const timestamp = 1634567890;
    const result = formatDate(timestamp);
    expect(result).toMatch(/\w+, \w+ \d{1,2}/); 
  });
});