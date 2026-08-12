import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).window = dom.window as any;
(global as any).document = dom.window.document as any;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InquiryForm from './InquiryForm';

describe('InquiryForm', () => {
  it('renders and advances steps', async () => {
    const { getByText } = render(<InquiryForm />);
    expect(getByText(/Who are you\?/i)).toBeTruthy();

    // Next button should be disabled until a segment is selected
    const nextBtn = getByText(/Next →/);
    expect(nextBtn).toBeTruthy();
    expect(nextBtn.getAttribute('disabled')).not.toBeNull();

    // Select the distributor option and proceed
    const distributor = getByText(/I'm a Distributor\/Dealer/i);
    fireEvent.click(distributor);
    // now the button should not be disabled
    expect(nextBtn.getAttribute('disabled')).toBeNull();
    fireEvent.click(nextBtn);

    // After clicking next, segment-specific title should appear
    expect(getByText(/Distributor \/ Dealer Details/i)).toBeTruthy();
  });
});
