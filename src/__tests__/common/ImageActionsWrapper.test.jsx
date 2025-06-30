import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageActionsWrapper from '../../components/common/ImageActionsWrapper';

// Mock the image export utilities
jest.mock('../../utils/imageExport', () => ({
  downloadComponentAsImage: jest.fn(),
  copyComponentAsImageToClipboard: jest.fn()
}));

import { downloadComponentAsImage, copyComponentAsImageToClipboard } from '../../utils/imageExport';

describe('ImageActionsWrapper', () => {
  const TestChild = () => <div data-testid="test-child">Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children content', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders download and copy buttons', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    expect(screen.getByText('Download as Image')).toBeInTheDocument();
    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
  });

  test('calls downloadComponentAsImage when download button is clicked', () => {
    render(
      <ImageActionsWrapper filename="test-file.png">
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenCalledTimes(1);
    expect(downloadComponentAsImage).toHaveBeenCalledWith(
      expect.any(Object), // ref object
      'test-file.png'
    );
  });

  test('calls copyComponentAsImageToClipboard when copy button is clicked', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const copyButton = screen.getByText('Copy to Clipboard');
    fireEvent.click(copyButton);
    
    expect(copyComponentAsImageToClipboard).toHaveBeenCalledTimes(1);
    expect(copyComponentAsImageToClipboard).toHaveBeenCalledWith(
      expect.any(Object) // ref object
    );
  });

  test('uses default filename when none provided', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenCalledWith(
      expect.any(Object),
      'download.png'
    );
  });

  test('uses custom filename when provided', () => {
    render(
      <ImageActionsWrapper filename="custom-name.png">
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenCalledWith(
      expect.any(Object),
      'custom-name.png'
    );
  });

  test('applies correct CSS classes', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const wrapper = document.querySelector('.wrapper');
    const actionsContainer = document.querySelector('.actionsContainer');
    const downloadButton = document.querySelector('.downloadButton');
    const copyButton = document.querySelector('.copyButton');
    
    expect(wrapper).toBeInTheDocument();
    expect(actionsContainer).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
    expect(copyButton).toBeInTheDocument();
  });

  test('renders buttons as button elements', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    const copyButton = screen.getByText('Copy to Clipboard');
    
    expect(downloadButton.tagName).toBe('BUTTON');
    expect(copyButton.tagName).toBe('BUTTON');
  });

  test('maintains proper component structure', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const wrapper = document.querySelector('.wrapper');
    const actionsContainer = document.querySelector('.actionsContainer');
    const childContent = screen.getByTestId('test-child');
    
    expect(wrapper).toContainElement(childContent);
    expect(wrapper).toContainElement(actionsContainer);
  });

  test('handles multiple children', () => {
    render(
      <ImageActionsWrapper>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </ImageActionsWrapper>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  test('handles complex child components', () => {
    const ComplexChild = () => (
      <div>
        <h1>Title</h1>
        <p>Description</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );
    
    render(
      <ImageActionsWrapper>
        <ComplexChild />
      </ImageActionsWrapper>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('handles empty children', () => {
    render(<ImageActionsWrapper />);
    
    expect(screen.getByText('Download as Image')).toBeInTheDocument();
    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
  });

  test('handles null children', () => {
    render(<ImageActionsWrapper>{null}</ImageActionsWrapper>);
    
    expect(screen.getByText('Download as Image')).toBeInTheDocument();
    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
  });

  test('handles string children', () => {
    render(<ImageActionsWrapper>Simple text content</ImageActionsWrapper>);
    
    expect(screen.getByText('Simple text content')).toBeInTheDocument();
    expect(screen.getByText('Download as Image')).toBeInTheDocument();
    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
  });

  test('handles multiple button clicks', () => {
    render(
      <ImageActionsWrapper filename="test.png">
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    const copyButton = screen.getByText('Copy to Clipboard');
    
    fireEvent.click(downloadButton);
    fireEvent.click(copyButton);
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenCalledTimes(2);
    expect(copyComponentAsImageToClipboard).toHaveBeenCalledTimes(1);
  });

  test('passes ref to wrapped content', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    fireEvent.click(downloadButton);
    
    // Verify that the ref passed to downloadComponentAsImage has a current property
    const refArg = downloadComponentAsImage.mock.calls[0][0];
    expect(refArg).toHaveProperty('current');
  });

  test('applies action button classes correctly', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    const copyButton = screen.getByText('Copy to Clipboard');
    
    expect(downloadButton).toHaveClass('actionButton', 'downloadButton');
    expect(copyButton).toHaveClass('actionButton', 'copyButton');
  });

  test('handles rapid successive clicks', () => {
    render(
      <ImageActionsWrapper>
        <TestChild />
      </ImageActionsWrapper>
    );
    
    const downloadButton = screen.getByText('Download as Image');
    
    fireEvent.click(downloadButton);
    fireEvent.click(downloadButton);
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenCalledTimes(3);
  });

  test('handles different filename formats', () => {
    const { rerender } = render(
      <ImageActionsWrapper filename="test.png">
        <TestChild />
      </ImageActionsWrapper>
    );
    
    let downloadButton = screen.getByText('Download as Image');
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenLastCalledWith(
      expect.any(Object),
      'test.png'
    );
    
    rerender(
      <ImageActionsWrapper filename="another-file.jpg">
        <TestChild />
      </ImageActionsWrapper>
    );
    
    downloadButton = screen.getByText('Download as Image');
    fireEvent.click(downloadButton);
    
    expect(downloadComponentAsImage).toHaveBeenLastCalledWith(
      expect.any(Object),
      'another-file.jpg'
    );
  });
});
